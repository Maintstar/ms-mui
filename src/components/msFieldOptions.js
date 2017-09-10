import React from 'react'
import propTypes from 'prop-types'
import { groupBy } from './ms'

export default class MSFieldOptions extends React.PureComponent {

  static propTypes = {
    nameCol: propTypes.string,
    idCol: propTypes.string,
    groupCol: propTypes.string,

    onSelect: propTypes.func.isRequired,
    options: propTypes.arrayOf(propTypes.object),

    //selIndex: propTypes.number,
    filter: propTypes.string,
  }

  render() {

    const groupCol = 'group'
    const idCol = 'id'
    const nameCol = 'name'

    let { options, filter, onSelect } = this.props

    // filter/group options
    let grouped = null;
    if (Array.isArray(options)) {
      if (filter) {
        let fItems = filter.trim().toLowerCase()
        fItems = fItems.split(' ').filter(x => x)
        options = options.filter(o => fItems.every(x => (o[nameCol] + '').toLowerCase().indexOf(x) >= 0))
      }
      grouped = groupBy(options, groupCol)
    }

    // todo: optimize here, render always, but hide with display:none

    return <div className="ms-field_opts">
      {
        Object.keys(grouped).map((k, i) => {
          let options = grouped[k]
          return (
            <div className="group" key={k}>
              {
                k !== 'undefined' && <div className="name">{k}</div>
              }
              <ul>
                { 
                  options.map(o => 
                    <MSFieldOption 
                      key={o[idCol]} 
                      id={o[idCol]} 
                      name={o[nameCol]} 
                      thick={o.thick} 
                      onClick={onSelect} 
                    />
                  )
                }
              </ul>
            </div>
          )
        })
      }
    </div>
  }
}

class MSFieldOption extends React.PureComponent {
  
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    thick: propTypes.bool,
    id: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    name: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired
  }

  handleClick = () => {
    this.props.onClick(this.props.id)
  }

  render() {
    let { name, thick } = this.props
    return <li className={ thick && 'thick' } onMouseDown={ this.handleClick }>{name}</li>
  }
}