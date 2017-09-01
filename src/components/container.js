import React from 'react'
import PropTypes from 'prop-types'
import Container from 'muicss/lib/react/container'
import { getClassName, addSizeClasses, addSizeClassesSuffix, initClasses } from './ms'
import './container.css'

const prefix = 'mui-container'

export default function _Container (props) {
  let { className, size, nopad, ...rest } = props
  let classes = addSizeClasses(initClasses(className, {}), size, prefix)
  if (nopad) addSizeClassesSuffix(classes, size, prefix, 'nopad')
  return <Container className={getClassName(classes)} {...rest} />
}

_Container.propTypes = {
  nopad: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
}
