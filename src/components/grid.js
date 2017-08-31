import React from 'react'
import { getClassName, addSizeClasses, initClasses } from './ms'

export default function _Grid (props) {
  let { className, size, fixed, children, ...rest } = props
  let classes = fixed ? {'mui-container-fluid': 1} : {'mui-container': 1}
  initClasses(className, classes)
  return <div className={getClassName(addSizeClasses(classes, size, 'mui-container'))} style={ fs && {'fontSize':fs} }>
    <table className="mui-table" {...rest}>
      {children}
    </table>
  </div>
}
