import React from 'react';

class Row extends React.PureComponent {
  static defaultProps = {
    className: ''
  };

  render() {
    const { children, className, ...rest } = this.props;

    return (
      <div { ...rest } className={'mui-row ' + className}>
        {children}
      </div>
    );
  }
}

/** Define module API */
export default Row;
