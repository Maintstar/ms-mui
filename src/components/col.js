import React from 'react';
import { getClassName, initClasses } from './ms'

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

export default class Col extends React.PureComponent {
  defaultProps() {
    let props = {className: ''},
      i,
      v;

    // add {breakpoint}, {breakpoint}-offset to props
    for (i=breakpoints.length - 1; i > -1; i--) {
      v = breakpoints[i];
      props[v] = null;
      props[v + '-offset'] = null;
    }

    return props;
  }

  render() {
    let i,
      bk,
      val,
      baseCls;

    let { children, className, ...rest } = this.props;

    let cls = initClasses(className)

    // add mui-col classes
    for (i=breakpoints.length - 1; i > -1; i--) {
      bk = breakpoints[i];
      baseCls = 'mui-col-' + bk;

      // add mui-col-{bk}-{val}
      val = this.props[bk];
      if (val) cls[baseCls + '-' + val] = true;

      // add mui-col-{bk}-offset-{val}
      val = this.props[bk + '-offset'];
      if (val) cls[baseCls + '-offset-' + val] = true;

      // remove from rest
      delete rest[bk];
      delete rest[bk + '-offset'];
    }

    return (
      <div className={getClassName(cls)} { ...rest }>
        {children}
      </div>
    )
  }
}
