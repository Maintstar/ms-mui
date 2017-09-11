import React from 'react';
import './panel.css'

class Panel extends React.Component {
  static defaultProps = {
    className: ''
  };

  render() {
    const {children, className, ...rest} = this.props;
    return (
      <div { ...rest } className={'mui-panel ' + className}>
        {children}
      </div>
    );
  }
}

/** Define module API */
export default Panel;
