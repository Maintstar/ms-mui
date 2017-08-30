import React from 'react'
import pt from 'prop-types'
import Select from 'muicss/lib/react/select'
import './msSelect.css'
import { addSizeClassname, addErrorWarnClasses, groupBy } from './ms'

export default function MSSelect (props) {
  let {options, emptyValue, size, error, warning, onSelected, ...rest} = props
  options = options || []
  const classNames = ['ms-field']
  addSizeClassname(classNames, size)
  addErrorWarnClasses(classNames, error, warning)

  return (
    <div className={classNames.join(" ")}>
      { (error || warning) &&
        <div className="ms__message">{error || warning}</div>
      }
      <Select {...rest}>
        { emptyValue && <option value="">{emptyValue}</option> }
        { options.map(x => (<option key={x.id} value={x.id}>{x.value || x.name}</option>)) }
      </Select>
    </div>
  )
}

MSSelect.propTypes = {
  options: pt.arrayOf(pt.shape({
    id: pt.oneOfType([
      pt.string,
      pt.number
    ]),
    value: pt.string,
    name: pt.string
  }))
}