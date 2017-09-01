import React from 'react'
import Container from 'muicss/lib/react/container'
import { getClassName, addSizeClasses, initClasses } from './ms'
import './container.css'

const prefix = 'mui-container'

export default function _Container (props) {

  let { className, size, nopad, ...rest } = props
  let classes = addSizeClasses(initClasses(className, {}), size, prefix)
  if (nopad) classes[prefix + '_nopad'] = 1
  return <Container className={getClassName()} {...rest} />
}
