import React from 'react'
import autosize from 'autosize'

import {addSizeClasses, addErrorWarnClasses, getClassName, initClasses, addGridClasses, getFieldHeightBySize} from './ms'
import Loading from '../components/loading'
import propTypes from 'prop-types'
import MSChips from './msChips'
import MSFieldOptions from './msFieldOptions'
import { isMobile } from '../utils/mobile'
import requestAnimationFrame from '../utils/requestAnimationFrame'
import getElementBBox from '../utils/getElementBBox'
import OptionsBody from '../utils/initOptionsBody'

import './msField.css'
import './msFieldSmall.css'
import './msFieldXSmall.css'
import './msFieldContainer.css'
import './msFieldDate.css'

const defClass = {'ms-field': 1}
const emptyArray = []
const styleHidden = {display:'none'}

const onChangeFld = { type: 'text', value: "", name: "" }
const onChangeEvent = {
  target: onChangeFld, 
  currentTarget: onChangeFld, 
  stopPropagation: () => {}, 
  preventDefault: () => {}
}


const maxContHeight = 250
// coefficient when options show at the top
const topK = 0.30
const noop = ()=>{}

// variants
/*

+ msField     text
- msField     [options]                  - allow to select proper value only, selects idCol   to value
- msField     [options, isFree]          - allow to enter whatever allowed,   select  nameCol to value
- msField     [options, isMulti]         - allow to enter whatever allowed,   select  nameCol to value
- msField     [options, isFree, isMulti] - allow to enter whatever allowed several times

*/

function getOptionsStyle(fieldTop, props, grid) {
  let { size, itemHeight, options } = props
  let optionsCount = (options && options.length) || 0
  let fieldHeight = getFieldHeightBySize(size)
  let contHeight = Math.min((optionsCount + 1) * (itemHeight + 1), maxContHeight)

  // because when field is in grid mode xs=6...
  // box-sizing: border-box; which makes size to be different because of border calc
  // as i understand
  grid = grid ? 1 : 0

  // if mobile and show on top
  if (isMobile()) {
    let windowsHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    let showOnTop = fieldTop / windowsHeight > topK
    if (showOnTop) {
      return {height: Math.min(fieldTop, contHeight), bottom: fieldHeight}
    }
  }

  // otherwise
  return {height: contHeight, bottom: -(contHeight + grid)}
}

export default class MSField extends React.PureComponent {

  static defaultProps = {
    nameCol: 'name',
    idCol: 'id',
    descCol: null,
    groupCol: 'group',
    isFree: false,
    isMulti: false,
    preventFilter: false,
    floatingLabel: true,
    disabled: false,
    stretch: false,
    required: false,
    isPortal: true,
    itemHeight: 35,
    dataAttr: {}
  }

  static propTypes = {
    nameCol: propTypes.string,
    idCol: propTypes.string,
    groupCol: propTypes.string,
    stretch: propTypes.bool,

    style: propTypes.object,
    labelStyle: propTypes.object,
    contStyle: propTypes.object,
    onClear: propTypes.func,
    onBlur: propTypes.func,

    label: propTypes.string,
    name: propTypes.string.isRequired,
    disabled: propTypes.bool,
    isPortal: propTypes.bool,
    min: propTypes.string,
    max: propTypes.string,

    // selected value of control
    value: propTypes.oneOfType([propTypes.array, propTypes.number, propTypes.string]),
    // text of control
    text: propTypes.oneOfType([propTypes.array, propTypes.number, propTypes.string]),
    options: propTypes.arrayOf(propTypes.object),

    className: propTypes.string,
    error: propTypes.string,
    warning: propTypes.string,
    size: propTypes.string,
    itemHeight: propTypes.number,
    dataAttr: propTypes.object,
    maxLength: propTypes.string,

    // autoType for textarea
    autoHeight: propTypes.bool,

    isLoading: propTypes.bool,
    isMulti: propTypes.oneOfType([propTypes.bool, propTypes.number]),
    //isFree,

    // should we hide dropicon
    hideDropIcon: propTypes.bool,
    preventFilter: propTypes.bool,
    required: propTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      filter: false,
      touched: false,
      isFullScreen: false
    }

    this.input = React.createRef();
    this.optionsBody = new OptionsBody()
    this.onBlurTimeOut = null
  }

  componentWillUnmount() {
    this.onBlurTimeOut && clearTimeout(this.onBlurTimeOut)
    window.removeEventListener('scroll', this.windowScroll)
  }

  onFocus = () => {
    // we make timeout, so browser already scroll to that field, and keyboard opened without lag
    // user has time to input something, and we don't see lags
    //setTimeout(() => {
    this.optionsBody.updateDimensions(this.input.current)
    this.setState({open: true, touched: true})
    //}, 300)
    this.props.onFocus && this.props.onFocus()
    window.addEventListener('scroll', this.windowScroll)
  }

  onBlur = () => {
    // otherwise, click will not be able to fire, and options will be hidden already
    this.onBlurTimeOut = setTimeout(() => {
      this.setState({open: false, filter: false})

      let { name, text, onChange } = this.props
      if (onChange && this.isValueMode() && text) {
        onChangeFld.value = null
        onChangeFld.name = name + "Text"
        onChange.call(this, onChangeEvent)
      }

      if (this.props.onBlur) {
        onChangeFld.value = null
        onChangeFld.name = name + "Text"
        this.props.onBlur.call(this, onChangeEvent)
      }
    })
    window.removeEventListener('scroll', this.windowScroll)
  }

  toggle = (ev) => {
    if (!this.state.open) this.input.current.focus()
    ev.target.blur()
  }

  onChange = ev => {
    let { value, name, onChange, isMulti} = this.props

    if (this.state.filter === false)
      this.setState({filter: true})
    if (this.state.open === false)
      this.setState({open: true})

    // on change
    onChange = onChange || noop

    if (this.isValueMode())
    {
      if (value && !isMulti)
      {
        this.select(null, {cleanSelection: true})
      }
      else
      {
        onChangeFld.value = ev.target.value
        onChangeFld.name = name + "Text"
        onChange.call(this, onChangeEvent)
      }
    }
    else
    {
      onChange.call(this, ev)
    }
  }

  /*
   left = 37
   up = 38
   right = 39
   down = 40
   */

  resetActive = () => {
    let changed = this.activeIndex !== -1
    this.activeIndex = -1;
    if (changed)
      this.highlightActive()
  }

  onKeyDown = (ev) => {
    let kc = ev.keyCode;
    if (kc === 40 || kc === 38 || kc === 13) {
      if (kc === 40) this.activeIndex++;
      if (kc === 38) this.activeIndex--;
      if (kc === 13 && this.props.options) {
        let activeIndexOrDefault = this.activeIndex === -1 ? 0 : this.activeIndex;
        let el = this.optionsDiv.querySelector('[data-index="' + activeIndexOrDefault + '"]');

        if (el) {
          this.select(el.getAttribute('value'), {blur: true});
        }
      }
      if (this.activeIndex < -1) this.activeIndex = -1
      this.highlightActive()
    }
    // when empty already and we click backspace, we hide
    if (kc === 8 && this.isValueMode() && !this.props.text)
    {
        this.setState({open: false})
      }
    }

  highlightActive = () => {
    if (this.optionsDiv) {
      const hglCls = "ms-options_it--active"
      let pr = document.querySelector('.' + hglCls)
      if (pr) pr.classList.remove(hglCls)
      let el = this.optionsDiv.querySelector('[data-index="' + this.activeIndex + '"]');
      if (el) el.classList.add(hglCls);
    }
  }

  onMouseMove = (ev) => {
    let i = ev.target.getAttribute("data-index");
    if (this.activeIndex !== i) {
      this.activeIndex = i;
      this.highlightActive()
    }
  }

  isValueMode = () => this.props.isFree === false && (this.props.options)

  isTextArea = () => this.props.type === 'textarea'

  isTextAreaAutoSize = () => this.props.autoHeight !== false

  handleClear = () => {
    this.select(null)
    // restore textArea size, when clear.
    if (this.isTextArea() && this.isTextAreaAutoSize()) {
      setTimeout(() => {
        autosize.update(this.input.current);
      },0)
    }
  }

  handleRemove = id => {
    let { value } = this.props
    if ( value != null ) {
      value = value.filter(x => x !== id)
      if (value.length === 0) value = null
    }
    this.select(value, {setOnlySent: true})
  }

  handleSelect = id => {
    // select from mouse or click on screen, we want blur in this scenarios
    // in case with keyboard, up down enter selection, we need to think
    this.select(id, {blur: true})
  }

  select(newValue, { setOnlySent, cleanSelection, blur } = {}) {
    let { value, isMulti, isFree, onSelected, onClear, name } = this.props
    let sentValue = newValue
    let valueText = null

    if (newValue != null) {
      if (isMulti) {
        // skip selected
        if (!setOnlySent) {
          // check if selected values already selected
          if (value && value.find(x => x === newValue)) return
          // new chips list
          if (value == null)
            newValue = [newValue]
          else if (newValue != null)
            newValue = [...value, newValue]
          else
            newValue = null
        }
      }
      else {
        let opt = this.getOption(newValue)
        newValue = opt[this.props.idCol]
        valueText = opt[this.props.nameCol]
      }
    }

    if (onClear && newValue == null) {
      onChangeFld.value = valueText
      onChangeFld.name = name
      onClear(onChangeEvent)
    }

    // call only selected if selected, or onChange if no onSelected
    if (!isFree && onSelected) {
      // sentValueId
      onSelected.call(this, newValue, valueText, this, sentValue)
    }
    else {
      // call on change when value changed
      if (this.props.value !== valueText)
      {
        onChangeFld.value = valueText
        onChangeFld.name = name
        this.props.onChange.call(this, onChangeEvent)
      }
    }

    // if this is not clean selection, when value deselected
    if (!cleanSelection) {
      this.setState({open: false});
    }

    // we blur field, because we selected. this is better behaviour.
    if (blur) {
      setTimeout(() => {
        this.input.current.blur()
      })
    }
  }

  onClick = () => {
    this.optionsBody.updateDimensions(this.input.current)
    this.setState({open:true});
  }

  getOption(value) {
    let { options: opts, idCol } = this.props
    // convert to number if number.
    if (opts.length > 0 && typeof opts[0][idCol] === 'number') value = +value
    for (let i = 0; i < opts.length; i++) {
      let o = opts[i]
      // i do compare specifically with == not === to make 1 == '1' be true.
      // because value comes from attribute always string, but in options we could have number.
      if (o[idCol] === value) {
        return o
      }
    }
  }

  getSelectedOptions(value) {
    let { options, idCol, nameCol } = this.props

    if (value == null || value === '') return emptyArray

    if (!Array.isArray(value))
      value = [value]

    let chips = null;
    if (Array.isArray(options)) {
      chips = value.map(v => {
        let f = options.find(f => f[idCol] === v)
        return f ?
          { id: f[idCol], value: f[nameCol] || f[idCol] } :
          { id: v, value: v }
      })
    } else {
      chips = value.map(v => ({id: v, value: v}))
    }
    return chips
  }

  setRef = el => this.optionsDiv = el

  componentDidUpdate() {
    this.updatePos()
  }

  windowScroll = () => {
    requestAnimationFrame(this.updatePos)
  }

  updatePos = () => {
    if (this.optionsDiv) {
      let st = getOptionsStyle(getElementBBox(this.input.current).top, this.props, this.grid)

      this.optionsDiv.style.bottom = st.bottom != null ? st.bottom + 'px' : ''
      this.optionsDiv.style.top = st.top != null ? st.top + 'px' : ''
      this.optionsDiv.style.height = st.height != null ? st.height + 'px' : ''
    }
  }

  handleStretch = () => this.setState({ isFullScreen: !this.state.isFullScreen })

  getValue = (chips, value) => {
    if (this.props.isFree === true) {
      // we are ok, value ==> value
    } else {
      if (this.props.text != null) {
        if (this.props.options) value = this.props.text
      } else {
        if (this.props.isMulti) {
          value = ''
        } else {
          // if single value dropdown, then select one
          if (chips && chips.length) value = chips[0].value
        }
      }
    }
    return value
  }

  setLabelClasses = (chips, floatingLabel, value) => {
    let labelClass = initClasses(null, {'ms-label':1})
    if (floatingLabel) {
      if (this.props.isMulti === true) {
        // value selected
        if (chips.length > 0) {
          if (this.state.open) {
            labelClass['ms-label--hide'] = 1
            labelClass['ms-label--float'] = 1
          }
          else {
            labelClass['ms-label--float'] = 1
          }
        }
        // no value selected
        else {
          if (this.state.open) {

          }
          else {
            labelClass['ms-label--float'] = 1
          }
        }
      }
      else {
        if (!value && !this.state.open)
          labelClass['ms-label--float'] = 1
      }
    }
    return labelClass
  }

  render() {
    let {
      label,
      name,
      value,
      text,
      type,
      style,
      labelStyle,
      contStyle,
      options,
      floatingLabel,
      itemHeight,
      emptyValue,
      autoComplete,
      maxLength,
      dataAttr,
      disabled,
      isPortal,
      stretch,

      className,
      error,
      warning,
      size,

      isLoading,
      isMulti,
      isFree,

      // should we hide dropicon
      hideDropIcon,
      preventFilter,
      
      nameCol,
      idCol,
      descCol,
      groupCol,
      required,
    } = this.props

    let { filter, isFullScreen } = this.state

    this.resetActive();

    let isEmpty = !value
    if (isFullScreen) floatingLabel = false
    // make classes
    const classes = initClasses(className, defClass)
    addSizeClasses(classes, size)
    addErrorWarnClasses(classes, error, warning, required)
    this.grid = addGridClasses(classes, this.props, false)

    if (isFullScreen) classes['ms-field--full-screen'] = 1
    if (value) classes['ms-field--filled'] = 1

    let chips = this.getSelectedOptions(value)
    value = this.getValue(chips, value)

    // get label class
    let labelClass = this.setLabelClasses(chips, floatingLabel, value)

    let dateProps = {}

    if (type === 'date') dateProps = { min: this.props.min, max: this.props.max }

    let inputProps = {
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      onClick: this.onClick,
      onKeyDown: this.onKeyDown,
      name,
      value,
      type,
      style,
      autoComplete,
      maxLength,
      disabled,
      ...dateProps,
      ...dataAttr
    }

    let optionsAreVisible = Array.isArray(options) && options.length > 0 && this.state.touched
    //console.log(value)

    let optionsProps = {
      options,
      filter: (!preventFilter && filter) ? (text || (isFree ? value: null)) : null,
      onSelect: this.handleSelect,
      onMouseMove: this.onMouseMove,
      itemHeight,
      nameCol,
      idCol,
      descCol,
      groupCol,
      emptyValue
    }


    return (
      <div className={getClassName(classes)} style={contStyle}>
        {
          // error message
          (error || warning) &&
          <div className="ms__message">{error || warning}</div>
        }
        {
          // chips
          isMulti && chips && chips.length > 0 &&
          <MSChips options={chips} onRemove={this.handleRemove}/>
        }
        {stretch &&
          (isFullScreen
          ? <div className='ms-field__stretch' onClick={this.handleStretch}>×</div>
          : <div className='ms-field__stretch ms-field__stretch-icon' onClick={this.handleStretch} />)
        }
        {
          // label
          label &&
          <label className={getClassName(labelClass)} style={labelStyle}>{label}</label>
        }
        {
          // field
          this.isTextArea() ?
            <textarea ref={this.input} {...inputProps} /> :
            <input ref={this.input} {...inputProps} />
        }
        {
          !hideDropIcon && options && type !== 'date' && type !== 'textarea' &&
          <div className="ms-field--dd clear" onFocus={this.toggle} tabIndex='0'/>
        }
        {/*
          // clear button
          !options && !isEmpty && type !== 'date' && type !== 'textarea' &&
          <div className="clear" onClick={this.handleClear}>×</div>
        */}
        {
          isPortal
            ? this.state.open ? this.optionsBody.renderOptions(
            {
              children: optionsAreVisible &&
              <div className="ms-options_cont" ref={this.setRef} style={this.state.open ? null : styleHidden}>
                <MSFieldOptions {...optionsProps} />
              </div>
            }
            ) : this.optionsBody.removeOptions()
            : this.state.open && optionsAreVisible &&
            <div className="ms-options_cont" ref={this.setRef} style={this.state.open ? null : styleHidden}>
              <MSFieldOptions {...optionsProps} />
            </div>
        }
        {
          // loading spinner
          isLoading && <Loading />
        }
      </div>
    )
  }
}


