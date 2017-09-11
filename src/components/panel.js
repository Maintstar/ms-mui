import React from 'react';
import './panel.css'


export default function Panel(props) {
  let {children, className, ...rest} = props;
  className = className ? 'mui-panel ' + className : 'mui-panel'
  return (
    <div { ...rest } className={className}>
      {children}
    </div>
  );
}