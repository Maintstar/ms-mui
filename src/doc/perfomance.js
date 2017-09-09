import React from 'react'
import MSField from '../components/msField'
import Perf from 'react-addons-perf'
import './index.css'

window.Perf = Perf
window.s = Perf.start
window.f = Perf.stop
window.p = () => {
  Perf.printInclusive()
  Perf.printWasted()
}

var opts1 = [
  {id:1, name:'Option 1'},
  {id:2, name:'Option 2'},
  {id:3, name:'Option 3'},
  {id:4, name:'Option 4'}
]
var emptyString = ""

export default class Perfomance extends React.PureComponent {

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
    const s = {[ev.target.name]: v}
    this.setState(s)
  }

  onSelected = (id, o, t) => {
    const s = {[t.props.name + 'Id']: id}
    this.setState(s)
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

    //console.log(v)

    return v
  }

  

  render() {
    let fp = this.fp
    return (
      <div style={{width:300, margin: 'auto', padding:'400px 0'}}>

        <h2>Check Perfomance</h2>

        <MSField {...fp("dd1")} label="Option 1" isMulti={true} options={opts1} />

        <MSField {...fp("dd2")} label="Option 1" hideDropIcon={true} options={opts1} 
          />

        <MSField label="Option 2" name="f3"
          />


      </div>
    )
  }
}