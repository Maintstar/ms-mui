import React from 'react'
import Button from 'muicss/lib/react/button'
import './button_small.css'
import './button_xsmall.css'
import { getClassName, addSizeClasses, initClasses } from './ms'

export default function _Button (props) {
  let { className, size, ...rest } = props
  let classes = initClasses(className, {})
  addSizeClasses(classes, size)
  return <Button className={getClassName(classes)} {...rest} />
}