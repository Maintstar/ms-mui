import React from 'react';
import { addErrorWarnClasses, initClasses, getClassName } from './ms'

const getLabel = (p, n) => n ? p + ` (${n})` : p

export default function MSCheckbox(props)  {
  const { error, warning, className, label, ...rest } = props;
  let cls = initClasses(className, {'mui-checkbox': 1})
  addErrorWarnClasses(cls, error, warning)

  return <div className={getClassName(cls)}>
    <label>
      <input type="checkbox" name="c21" {...rest} />
      { getLabel(label, error || warning) }
    </label>
  </div>
}
