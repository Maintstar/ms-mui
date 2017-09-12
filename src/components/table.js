import React from 'react'
import { getClassName, addSizeClasses, initClasses } from './ms'
import './table.css'
import './tableSmall.css'
import './tableXSmall.css'

export default function _Table (props) {
  let { className, size, children, ...rest } = props
  let fs = size === 's' ? 13 : size === 'xs' ? 12 : null
  return <div className={getClassName(addSizeClasses(initClasses(className, {}), size, 'mui-table'))} style={ fs && {'fontSize':fs} }>
    <table className="mui-table" {...rest}>
      {children}
    </table>
  </div>
}
