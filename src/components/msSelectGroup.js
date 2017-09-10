import React from 'react'
import propTypes from 'prop-types'

export default class MSSelectGroup extends React.PureComponent {

  static propTypes = {
    nameCol: propTypes.string,
    idCol: propTypes.string,
    group: propTypes.string.isRequired,

    options: propTypes.arrayOf(propTypes.object).isRequired,
  }

  render() {
    const idCol = 'id'
    const nameCol = 'name'

    let { options, group } = this.props

    return <optgroup label={group}>{        
      options.map(o => 
        <option value={o[idCol]}>{o[nameCol]}</option>
      )
    }
    </optgroup>
  }
}