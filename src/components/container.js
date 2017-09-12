import React from 'react'
import PropTypes from 'prop-types'
import { getClassName, addSizeClasses, initClasses } from './ms'

import './containerMui.css'
import './container.css'

const prefix = 'mui-container'

export default class Container extends React.PureComponent {

  static defaultProps = {
    nopad: false,
    fluid: false,
  };

  static propTypes = {
    nopad: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool
    ]),
  }


  render() {
    const { children, className, size, nopad, fluid, ...rest } = this.props;

    let cls = addSizeClasses(initClasses(className), size, prefix)
    if (nopad) cls[prefix + '--0pad'] = 1

    cls[fluid ? 'mui-container-fluid' : 'mui-container'] = 1

    return (
      <div { ...rest } className={getClassName(cls)}>
        {children}
      </div>
    );
  }
}
