import React from 'react'
import './msChips.css'


export default class MSChips extends React.Component {

  onRemove = (e) => {
    const {onRemove} = this.props
    const a = e.currentTarget.getAttribute('value')
    if (onRemove)
    {
      onRemove.call(this, a)
    }
  }

  render() {
    let { options } = this.props
    options = options || []
    return (<div className="ms-chips">
      {options.map(c =>
        (<div className="ms-chips_it" key={c.id}>{c.value}<i className="ms-chips_close" onClick={this.onRemove} value={c.id}>×</i></div>)
      )}
    </div>)
  }
}
