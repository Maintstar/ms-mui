import React from 'react'
import MSField from '../components/msField'
import Perf from 'react-addons-perf'
import './index.css'

window.Perf = Perf

var opts1 = [
  {id:1, name:'Option 1'},
  {id:2, name:'Option 2'},
  {id:3, name:'Option 3'},
  {id:4, name:'Option 4'}
]
var emptyString = ""

export default class extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidUpdate() {
    // Perf.stop()
    // Perf.printInclusive()
    // Perf.printWasted()
  }

  onChange = (ev) => {
    let v = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value
    const s = {...this.state, [ev.target.name]: v}
    this.setState(s)
  }

  onSelected = (id, o, t) => {
    const s = {...this.state, [t.props.name + 'Id']: id}
    this.setState(s)
    console.log('selected',s,id)
  }

  // form properties
  fp = (n) => {

    let v = ({
      name:n,
      value: this.state[n] || emptyString,
      onChange: this.onChange,
      onSelected: this.onSelected
    })

    if (this.state[n+'Id'])
      v.valueId = this.state[n+'Id']

    return v
  }

  

  render() {
    let fp = this.fp
    return (
      <div style={{width:300, margin: 'auto', padding:'400px 0'}}>

        <h2>Check Perfomance</h2>
        <MSField {...fp("dd1")} label="Option 1" isMulti={true} options={opts1} />


        <MSField {...fp("dd2")} label="Option 1" hideDropIcon={true} options={opts1} 
          style={{marginTop:300}}/>

        hello

      </div>
    )
  }
}