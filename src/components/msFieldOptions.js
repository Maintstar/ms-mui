import React from 'react'
import propTypes from 'prop-types'
import { groupBy } from './ms'

export default class MSFieldOptions extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      from: 0
    }
  }

  static defaultProps = {
    nameCol: 'name',
    idCol: 'id',
    groupCol: 'group',
    itemHeight: 35
  }

  static propTypes = {
    nameCol: propTypes.string,
    idCol: propTypes.string,
    groupCol: propTypes.string,
    itemHeight: propTypes.number,

    onSelect: propTypes.func.isRequired,
    options: propTypes.arrayOf(propTypes.object),

    //selIndex: propTypes.number,
    filter: propTypes.string,
  }

  handleClick = (ev) => {
    let v = ev.target.getAttribute('value')
    let isNumber = typeof this.props.options[0][this.props.idCol] === 'number'
    v = isNumber ? +v : v
    this.props.onSelect(v)
  }

  componentDidMount() {
    this.div.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.div.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.scrollTop = this.div.scrollTop

    // we search for index
    let from = this.scrollTop / this.props.itemHeight;
    if (from < 0) from = 0;

    // let we round by 3,  so index will go as: 0, 3, 6, 9, 12
    from = (from / 3 << 0) * 3
    if (this.state.from !== from)
    {
      this.setState({from})
    }
  }

  setRef = (el) => {
    this.div = el
  }

  render() {

    let { 
      options, 
      filter, 
      nameCol, 
      idCol, 
      groupCol,
      itemHeight
    } = this.props

    // render items
    let items = []
    let lastGroup = null
    for (let i = this.state.from; i < this.state.from + 10; i++) {
      let o = options[i]
      if (o) {
        let g = o[groupCol]
        // add group name
        if ((lastGroup == null && g != null) || (lastGroup != g)) {
          items.push(<div key={'group_' + g} className="ms-options_gr">{g}</div>)
          lastGroup = g
        }
        // add option
        items.push(<div key={o[idCol]} value={o[idCol]} className="ms-options_it"
                        style={{top: i * itemHeight}}>{o[nameCol]}</div>)
      }
    }

    // options has to be sorted by group
    return <div className="ms-options" ref={this.setRef} onMouseDown={this.handleClick}>
      {
        items
      }
      <div className="ms-options_last" style={{top: options.length * itemHeight}} />
    </div>
  }
}


// function MSFieldOption2(props) {
//   var { o } = props
//   return <li key={o.id}>
//     {o.name}
//   </li>
// }

// This is slow
// class MSFieldOption extends React.Component {
//
//   constructor(props) {
//     super(props)
//     this.handleClick = this.handleClick.bind(this)
//   }
//
//   static propTypes = {
//     thick: propTypes.bool,
//     id: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
//     name: propTypes.string.isRequired,
//     onClick: propTypes.func.isRequired
//   }
//
//   handleClick = () => {
//     this.props.onClick(this.props.id)
//   }
//
//   render() {
//     let { name, thick } = this.props
//     return <li className={ thick && 'thick' } onMouseDown={ this.handleClick }>{name}</li>
//   }
// }