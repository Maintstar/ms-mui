import React from 'react'
import './msChips.css'


const empty = []

export default class MSChips extends React.PureComponent {
  render() {
    let options = this.props.options || empty
    return <div className="ms-chips">
      { options.map(o => <MSChip key={o.id} onRemove={this.props.onRemove} id={o.id} value={o.value}/>)}
    </div>
  }
}

class MSChip extends React.PureComponent {

  handleRemove = () => {
    const {onRemove, id} = this.props
    if (onRemove) {
      onRemove.call(this, id)
    }
  }

  render() {
    return (<div className="ms-chips_it">
      {this.props.value}
      <i className="ms-chips_close" onClick={this.handleRemove}>×</i>
    </div>)
  }
}
