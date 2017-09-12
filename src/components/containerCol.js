import React from 'react';
import { getClassName, initClasses, addGridClasses, gridBreakpoints } from './ms'

export default class Col extends React.PureComponent {
  defaultProps() {
    let props = {className: ''},
      i,
      v;

    // add {breakpoint}, {breakpoint}-offset to props
    for (i=gridBreakpoints.length - 1; i > -1; i--) {
      v = gridBreakpoints[i];
      props[v] = null;
      props[v + '-offset'] = null;
    }

    return props;
  }

  render() {
    let { children, className, ...rest } = this.props;

    let cls = initClasses(className)
    addGridClasses(cls, rest)

    return (
      <div className={getClassName(cls)} { ...rest }>
        {children}
      </div>
    )
  }
}
