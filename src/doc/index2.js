import React from 'react'
import MSField from '../components/msField'
import Perf from 'react-addons-perf'
import './index.css'


export default class extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {

    }

    setTimeout(()=>{
      Perf.start("mark")
    },1000)
    // click
    // setTimeout(()=>{
    //
    //   let evt = document.createEvent("MouseEvents");
    //   evt.initMouseEvent("click", true, true, window,
    //     0, 0, 0, 0, 0, false, false, false, false, 0, null);
    //   let a = document.getElementsByName("dd1")[0];
    //   a.dispatchEvent(evt);
    //   console.log('dispatched')
    //
    // }, 1000)
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
  }

  // form properties
  fp = (n) => {
    let v = ({
      name:n,
      value: this.state[n] || "",
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
        <MSField {...fp("dd1")} label="Option 1" isMulti={true} options={[
          {id:1, name:'Option 1'},
          {id:2, name:'Option 2'},
          {id:3, name:'Option 3'},
          {id:4, name:'Option 4'}
        ]} />


        <h2>Check Perfomance</h2>
        <MSField {...fp("dd2")} label="Option 1" hideDropIcon={true} options={[
          {id:1, name:'Option 1'},
          {id:2, name:'Option 2'},
          {id:3, name:'Option 3'},
          {id:4, name:'Option 4'}
        ]} />

        hello

      </div>
    )
  }
}