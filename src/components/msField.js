import React from 'react'
import './msField.css'
import {addSizeClasses, addErrorWarnClasses, getClassName, initClasses} from './ms'
import Loading from '../components/loading'
import propTypes from 'prop-types'
import MSChips from './msChips'
import MSFieldOptions from './msFieldOptions'

// perfomance tune
// remove conversions to string and numbers everywhere, or do it once

const defClass = {'ms-field': 1}

const emptyArray = []

//const addLabel = (p, n) => n ? p + ` (${n})` : p

export default class MSField extends React.PureComponent {

  static defaultProps = {
    nameCol: 'name',
    idCol: 'id',
    groupCol: 'group'
  }

  static propTypes = {
    nameCol: propTypes.string,
    idCol: propTypes.string,
    groupCol: propTypes.string,

    onClear: propTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      filter: false,
      touched: false
    }
  }

  onFocus = () => {
    this.setState({open: true, touched: true})
  }

  onBlur = () => {
    // otherwise, click will not be able to fire, and options will be hidden already
    setTimeout(() => {
      this.setState({open: false, filter: false})
    })
  }

  onChange = ev => {
    let {valueId, onChange, isMulti} = this.props

    if (this.state.filter === false)
      this.setState({filter: true})

    // on change
    if (onChange) {
      onChange.call(this, ev)
    }

    // deselect if selected
    if (!isMulti && valueId != null) {
      setTimeout(() => {
        this.select(null, {skipOnChange: true})
      })
    }
  }

  handleClear = () => {
    this.select(null)
  }

  handleRemove = id => {
    let {valueId} = this.props
    if (valueId != null) {
      id = id + ''
      valueId = valueId.filter(x => x + '' !== id)
    }
    this.select(valueId, {setOnlySent: true})
  }

  handleSelect = id => {
    this.select(id)
  }

  select(newValueId, {setOnlySent, skipOnChange} = {}) {
    let {valueId, isMulti, onSelected, onChange, onClear, name} = this.props
    let chips = this.getSelectedOptions(valueId)

    if (newValueId != null) {
      chips = this.getSelectedOptions(newValueId)
      if (isMulti) {

        // skip selected
        if (!setOnlySent) {
          // check if selected values already selected
          let curChips = this.getSelectedOptions(valueId)
          if (curChips.find(x => x.id + '' === newValueId + ''))
            return
          // new chips list
          chips = [...curChips, ...chips]
        }

        newValueId = chips.map(x => x.id)
        if (newValueId.length === 0) newValueId = null
      }
      else if (chips.length > 0)
        newValueId = chips[0].id
      else
        newValueId = null
    }

    if (onClear && newValueId == null) {
      onClear()
    }

    if (onSelected) {
      onSelected.call(this, newValueId, chips, this)
    }

    // call onChange callback
    if (!skipOnChange && onChange) {
      setTimeout(() => {
        let chips = this.getSelectedOptions(newValueId)
        let v = isMulti || chips.length === 0 ? '' : chips[0].value;
        let f = {type: 'text', value: v, name}
        // check \redux-form\es\events\getValue.js  how redux form, takes value
        onChange.call(this, {
          target: f, currentTarget: f, stopPropagation: () => {
          }, preventDefault: () => {
          }
        })
      })
    }
  }

  getSelectedOptions(valueId) {
    let {options, idCol, nameCol} = this.props

    if (valueId == null || valueId === '') return emptyArray
    if (!Array.isArray(valueId))
      valueId = [valueId + '']
    else
      valueId = valueId.map(x => x + '')
    let chips = null;
    if (Array.isArray(options)) {
      chips = valueId.map(v => {
        let f = options.find(f => f[idCol] + '' === v + '')
        return f ?
          {
            id: f[idCol],
            value: f[nameCol]
          }
          :
          {
            id: v,
            value: v
          }
      })
    }
    else {
      chips = valueId.map(v => ({id: v, value: v}))
    }
    return chips
  }

  render() {

    let {
      label,
      name,
      value,
      valueId,

      options,

      className,
      error,
      warning,
      size,
      emptyValue,

      isLoading,
      isMulti,
      //isFree,

      // should we hide dropicon
      hideDropIcon,
      preventFilter
    } = this.props

    let {
      filter
    } = this.state

    let isEmpty = !value && !valueId

    // make classes
    const classes = initClasses(className, defClass)
    addSizeClasses(classes, size)
    addErrorWarnClasses(classes, error, warning)
    if (isEmpty && !hideDropIcon) {
      classes['ms-field--dd'] = 1
    }

    let chips = null
    if (valueId != null) {
      chips = this.getSelectedOptions(valueId)
    }

    // if single value dropdown, then select one
    if (chips && chips.length && !isMulti) {
      value = chips[0].value
      chips = null
    }

    // get label class
    let labelClass = initClasses(null, {'ms-field_label':1})
    if (isMulti === true)
    {
      // value selected
      if (valueId)
      {
        if (this.state.open) {
          labelClass['ms-field_label--hide'] = 1
          labelClass['ms-field_label--float'] = 1
        }
        else {
          labelClass['ms-field_label--float'] = 1
        }
      }
      // no value selected
      else
      {
        if (this.state.open) {

        }
        else {
          labelClass['ms-field_label--float'] = 1
        }
      }
    }
    else {
      if (!value && !this.state.open)
        labelClass['ms-field_label--float'] = 1
    }

    let inputProps = {
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      name,
      value
    }

    return (
      <div className={getClassName(classes)}>
        {
          // error message
          (error || warning) &&
          <div className="ms__message">{error || warning}</div>
        }
        {
          // chips
          chips &&
          <MSChips options={chips} onRemove={this.handleRemove}/>
        }
        {
          // label
          label &&
          <label className={getClassName(labelClass)}>{label}</label>
        }
        {
          // field
          <input {...inputProps} />
        }
        {
          // options
          Array.isArray(options) && this.state.touched &&
          <div className="ms-field_opts_cont" style={ { display: this.state.open ? '' : 'none' } }>
            <MSFieldOptions 
              options={ options } 
              filter={ (!preventFilter && filter) ? value : null }
              onSelect={ this.handleSelect }
              emptyValue= { emptyValue }
              />
          </div>
        }
        {
          // loading spinner
          isLoading && <Loading />
        }
        {
          // clear button
          !isEmpty &&
          <div className="clear" onClick={this.handleClear}>×</div>
        }
      </div>
    )
  }
}


