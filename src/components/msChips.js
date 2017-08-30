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
    return (<div className="chips">
      {options.map(c =>
        (<div className="chip" key={c.id}>{c.value}<i className="close" onClick={this.onRemove} value={c.id}>×</i></div>)
      )}
    </div>)
  }
}
