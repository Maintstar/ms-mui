import React from 'react'
import propTypes from 'prop-types'
import './msSelect.css'
import { addSizeClasses, addErrorWarnClasses, initClasses, getClassName, addGridClasses } from './ms'
import MSSelectGroup from './msSelectGroup'
import { groupBy } from '../utils/groupBy'

const defOptions = []
const defClass = {'ms-field':1}
const defLabelClass = {'ms-label':1}

export default class MSSelect extends React.PureComponent {

  static defaultProps = {
    nameCol: 'name',
    idCol: 'id',
    groupCol: 'group',
    emptyValue: ''
  }

  static propTypes = {
    nameCol: propTypes.string,
    idCol: propTypes.string,
    groupCol: propTypes.string,

    style: propTypes.object,

    options: propTypes.arrayOf(propTypes.shape({
      id: propTypes.oneOfType([
        propTypes.string,
        propTypes.number
      ]),
      value: propTypes.string,
      name: propTypes.string
    })),
    emptyValue: propTypes.oneOfType([propTypes.string, propTypes.bool]),
    error: propTypes.string,
    warning: propTypes.string,
    name: propTypes.string.isRequired,
    value: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,

    size: propTypes.string,

    onChange: propTypes.func,
    className: propTypes.string,
  }

  render() {
    let { 
      nameCol,
      idCol,
      groupCol,

      options, 
      value, 
      emptyValue, 

      label,
      name,

      className, 
      size, 
      error, 
      warning, 

      onChange, 
      style 
    } = this.props

    options = options || defOptions
    const classes = initClasses(className, defClass)
    addSizeClasses(classes, size)
    addErrorWarnClasses(classes, error, warning)
    addGridClasses(classes, this.props, false)

    // get label class
    let labelClass = initClasses(null, defLabelClass)
    let option = options.find(x => x[idCol]+'' === value+'')

    // to compare correctly below
    if (emptyValue === false) emptyValue = null
    if (emptyValue === '') emptyValue = ' '

    let hasText = 
      // option selected
      (option != null) || 
      // not selected but empty value is not empty
      (option == null && emptyValue && emptyValue !== ' ') || 
      // not selected but first one has text
      (option == null && !emptyValue && options[0] != null && options[0][nameCol])

    if (!hasText) {
      labelClass['ms-label--float'] = 1
    }

    let selProps = {
      name,
      value,
      onChange
    }

    // filter/group options
    let grouped = null;
    if (Array.isArray(options)) {
      grouped = groupBy(options, groupCol)
    }
    let groups = Object.keys(grouped)

    return (
      <div className={getClassName(classes)} style={style}>
        {
          // error message
          (error || warning) &&
          <div className="ms__message">{error || warning}</div>
        }
        {
          // label
          label &&
          <label className={getClassName(labelClass)}>{label}</label>
        }
        <select {...selProps}>          
          { 
            // empty value
            emptyValue && <option value="">{emptyValue}</option> 
          }
          { 
            // render groups
            groups.length > 1 &&
            groups.map(g => <MSSelectGroup
              idCol={idCol} 
              nameCol={nameCol}
              groupCol={groupCol}
              key={g}
              group={g} 
              options={grouped[g]} 
            />)
          }
          { 
            // render options
            groups.length === 1 &&
            options.map(x => <option key={x[idCol]} value={x[idCol]}>{x[nameCol]}</option>)
          }
        </select>
      </div>
    )
  }
}
