import React from 'react'
import Input from 'muicss/lib/react/input'
import Checkbox from 'muicss/lib/react/checkbox'
import './msField.css'
import { addSizeClasses, addErrorWarnClasses, getClassName, groupBy, initClasses } from './ms'
import Loading from '../components/loading'
import PropTypes from 'prop-types';
import MSChips from './msChips'


const addLabel = (p, n) => n ? p + ` (${n})` : p

export default class MSField extends React.Component {

  static defaultProps = {
    nameCol: 'name',
    idCol: 'id',
    groupCol: 'group'
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      filter: false
    }
  }

  onFocus = () => {
    this.setState({open: true})
  }

  onBlur = () => {
    setTimeout(() => {
      this.setState({open: false, filter: false})
    }, 0)
  }

  onChange = ev => {
    let { valueId, onChange, isMulti } = this.props

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

  clear = () => {
    this.select(null)
  }

  remove = id => {
    let { valueId } = this.props
    if (valueId != null) {
      id = id + ''
      valueId = valueId.filter(x => x + '' !== id)
    }
    this.select(valueId, { setOnlySent: true } )
  }

  onSelected = ev => {
    let selValue = ev.target.getAttribute("value")
    if (selValue) {
      this.select(selValue)
    }
  }

  select(newValueId, {setOnlySent, skipOnChange} = {}) {
    let { valueId, isMulti, onSelected, onChange, onClear, name } = this.props
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

    if(onClear && newValueId == null){
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
        let f = { type: 'text', value: v, name }
        // check \redux-form\es\events\getValue.js  how redux form, takes value
        onChange.call(this, { target: f, currentTarget: f, stopPropagation:()=>{}, preventDefault:()=>{} })
      })
    }
  }

  getSelectedOptions(valueId) {
    let {options, idCol, nameCol} = this.props

    if (valueId == null || valueId === '') return []
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

    let { className, error, warning, size, options, emptyValue, isLoading, hideDropIcon, idCol, nameCol, groupCol, onSelected, isMulti, isFree, dd, preventFilter, valueId, style, optionsStyle, onClear, ...rest } = this.props

    let showClear = (onClear && this.props.value) || (valueId != null && valueId !== '')

    const classes = initClasses(className, {'ms-field': 1})

    addSizeClasses(classes, size)
    addErrorWarnClasses(classes, error, warning)

    // for checkboxes, error,warning goes to label
    if (rest.type === 'checkbox')
      rest.label = addLabel(rest.label, error || warning)

    // show dropdown
    if (!hideDropIcon && Array.isArray(options) && !showClear)
      classes["show-dropdown"] = 1

    // set floatingLabel by default, for all applicable fields
    if (rest.type !== 'checkbox' && rest.type !== 'date' && rest.floatingLabel == null)
      rest.floatingLabel = true

    let chips = null
    if (valueId != null) {
      chips = this.getSelectedOptions(valueId)
    }

    Object.assign(rest, {onFocus: this.onFocus, onBlur: this.onBlur})

    // filter options
    let grouped = null;
    if (Array.isArray(options))
    {
      if (this.state.filter && !preventFilter && rest.value != null) {

        let filterValue = rest.value.trim().toLowerCase()
        filterValue = filterValue.split(' ')
        options = options.filter(o => filterValue.every(x => (o[nameCol] + '').toLowerCase().indexOf(x) >= 0))
      }

      // remove duplicates, there should not be duplicates, don't send those
      //options = uniqBy(options, idCol)

      if (options) {
        grouped = groupBy(options, groupCol)
      }
    }

    // if single value dropdown, then select one
    if (chips && chips.length && !isMulti) {
      rest.value = chips[0].value
      chips = null
    }

    // on change
    rest.onChange = this.onChange

    // get width into container style
    let contStyle = {}
    if (style) {
      let { width, ...s} = style
      contStyle = { width }
      rest.style = s
    }

    return (
      <div className={getClassName(classes)} style={contStyle}>
        {
          // error message
          rest.type !== 'checkbox' &&
          <div className="ms__message">{error || warning}</div>
        }
        {
          // chips
          chips &&
          <MSChips options={chips} onRemove={this.remove} />
        }
        {
          // field
          rest.type === 'checkbox' ?
            <Checkbox {...rest} />
            :
            <Input {...rest} />
        }
        {
          // options
          Array.isArray(options) && this.state.open &&
          <div className="opts-cont" style={optionsStyle}>
            <div className="opts">
            {
              Object.keys(grouped).map((k,i) => {
                let options = grouped[k]
                return (
                  <div className="group" key={i}>
                    {
                      k !== 'undefined' &&
                      <div className="name">{k}</div>
                    }
                    <ul onMouseDown={this.onSelected}>
                      { emptyValue && <li value="">{emptyValue}</li> }
                      { options.map(x => <li key={x[idCol]} className={x.thick ? 'thick':null} value={x[idCol]}>{x[nameCol] || (
                        <span className="empty">no value</span>)}</li>)
                      }
                    </ul>
                  </div>
                )
              })
            }
            </div>
          </div>
        }
        {
          // loading spinner
          isLoading && <Loading />
        }
        {
          // clear button
          showClear &&
          <div className="clear" onClick={this.clear}>×</div>
        }
      </div>
    )
  }
}

MSField.propTypes = {
  nameCol: PropTypes.string.isRequired,
  idCol: PropTypes.string.isRequired,
  groupCol: PropTypes.string.isRequired
}