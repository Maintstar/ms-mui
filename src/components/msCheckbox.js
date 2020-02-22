import React from 'react';
import { addErrorWarnClasses, initClasses, getClassName, addGridClasses } from './ms'
import './msCheckbox.css'

const getLabel = (p, n) => n ? p + ` (${n})` : p

export default function MSCheckbox(props)  {
  const { error, warning, className, label, onSelected, ...rest } = props;
  let cls = initClasses(className, {'mui-checkbox': 1})
  addErrorWarnClasses(cls, error, warning, rest.required)
  addGridClasses(cls, rest)

  return <div className={getClassName(cls)}>
    <label>
      <input type="checkbox" name="c21" {...rest} />
      { getLabel(label, error || warning) }
    </label>
  </div>
}
