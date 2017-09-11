import React from 'react'
import MSField from '../components/msField'
import MSSelect from '../components/msSelect'
import MSCheckbox from '../components/msCheckbox'

import Button from '../components/button'
import Table from '../components/table'
import Row from '../components/row'
import Col from '../components/col'
import Container from '../components/container'
import Panel from '../components/panel'

import L from './components/label'
import './index.css'


import Perf from 'react-addons-perf'
window.Perf = Perf
window.s = Perf.start
window.f = Perf.stop
window.p = () => {
  Perf.printExclusive()
  Perf.printWasted()
}


const states = [
  {id:'AL', name:'Alabama'},
  {id:'AK', name:'Alaska'},
  {id:'AZ', name:'Arizona'},
  {id:'AR', name:'Arkansas'},
  {id:'CA', name:'California'},
  {id:'CO', name:'Colorado'},
  {id:'CT', name:'Connecticut'},
  {id:'DE', name:'Delaware'},
  {id:'FL', name:'Florida'},
  {id:'GA', name:'Georgia'},
  {id:'HI', name:'Hawaii'},
  {id:'ID', name:'Idaho'},
  {id:'IL', name:'Illinois'},
  {id:'IN', name:'Indiana'},
  {id:'IA', name:'Iowa'},
  {id:'KS', name:'Kansas'},
  {id:'KY', name:'Kentucky'},
  {id:'LA', name:'Louisiana'},
  {id:'ME', name:'Maine'},
  {id:'MD', name:'Maryland'},
  {id:'MA', name:'Massachusetts'},
  {id:'MI', name:'Michigan'},
  {id:'MN', name:'Minnesota'},
  {id:'MS', name:'Mississippi'},
  {id:'MO', name:'Missouri'},
  {id:'MT', name:'Montana'},
  {id:'NE', name:'Nebraska'},
  {id:'NV', name:'Nevada'},
  {id:'NH', name:'New Hampshire'},
  {id:'NJ', name:'New Jersey'},
  {id:'NM', name:'New Mexico'},
  {id:'NY', name:'New York'},
  {id:'NC', name:'North Carolina'},
  {id:'ND', name:'North Dakota'},
  {id:'OH', name:'Ohio'},
  {id:'OK', name:'Oklahoma'},
  {id:'OR', name:'Oregon'},
  {id:'PA', name:'Pennsylvania'},
  {id:'RI', name:'Rhode Island'},
  {id:'SC', name:'South Carolina'},
  {id:'SD', name:'South Dakota'},
  {id:'TN', name:'Tennessee'},
  {id:'TX', name:'Texas'},
  {id:'UT', name:'Utah'},
  {id:'VT', name:'Vermont'},
  {id:'VA', name:'Virginia'},
  {id:'WA', name:'Washington'},
  {id:'WV', name:'West Virginia'},
  {id:'WI', name:'Wisconsin'},
  {id:'WY', name:'Wyoming'}
]


const statesGroups = [
  {id:'AL', name:'Alabama', group: 'A'},
  {id:'AK', name:'Alaska', group: 'A'},
  {id:'AZ', name:'Arizona', group: 'A'},
  {id:'AR', name:'Arkansas', group: 'A'},
  {id:'CA', name:'California', group: 'C'},
  {id:'CO', name:'Colorado', group: 'C'},
  {id:'CT', name:'Connecticut', group: 'C'},
  {id:'DE', name:'Delaware', group: 'D'},
  {id:'FL', name:'Florida', group: 'F'},
  {id:'GA', name:'Georgia', group: 'G'},
  {id:'HI', name:'Hawaii', group: 'H'},
  {id:'ID', name:'Idaho', group: 'I'},
  {id:'IL', name:'Illinois', group: 'I'},
  {id:'IN', name:'Indiana', group: 'I'},
  {id:'IA', name:'Iowa', group: 'I'},
  {id:'KS', name:'Kansas', group: 'K'},
  {id:'KY', name:'Kentucky', group: 'K'},
  {id:'LA', name:'Louisiana', group: 'L'},
  {id:'ME', name:'Maine', group: 'M'},
  {id:'MD', name:'Maryland', group: 'M'},
  {id:'MA', name:'Massachusetts', group: 'M'},
  {id:'MI', name:'Michigan', group: 'M'},
  {id:'MN', name:'Minnesota', group: 'M'},
  {id:'MS', name:'Mississippi', group: 'M'},
  {id:'MO', name:'Missouri', group: 'M'},
  {id:'MT', name:'Montana', group: 'M'},
  {id:'NE', name:'Nebraska', group: 'N'},
  {id:'NV', name:'Nevada', group: 'N'},
  {id:'NH', name:'New Hampshire', group: 'N'},
  {id:'NJ', name:'New Jersey', group: 'N'},
  {id:'NM', name:'New Mexico', group: 'N'},
  {id:'NY', name:'New York', group: 'N'},
  {id:'NC', name:'North Carolina', group: 'N'},
  {id:'ND', name:'North Dakota', group: 'N'},
  {id:'OH', name:'Ohio', group: 'O'},
  {id:'OK', name:'Oklahoma', group: 'O'},
  {id:'OR', name:'Oregon', group: 'O'},
  {id:'PA', name:'Pennsylvania', group: 'P'},
  {id:'RI', name:'Rhode Island', group: 'R'},
  {id:'SC', name:'South Carolina', group: 'S'},
  {id:'SD', name:'South Dakota', group: 'S'},
  {id:'TN', name:'Tennessee', group: 'T'},
  {id:'TX', name:'Texas', group: 'T'},
  {id:'UT', name:'Utah', group: 'U'},
  {id:'VT', name:'Vermont', group: 'V'},
  {id:'VA', name:'Virginia', group: 'V'},
  {id:'WA', name:'Washington', group: 'W'},
  {id:'WV', name:'West Virginia', group: 'W'},
  {id:'WI', name:'Wisconsin', group: 'W'},
  {id:'WY', name:'Wyoming', group: 'W'}
]

const getOptions = n => {
  const a = []
  for (let i=0; i<n; i++) {
    a.push({id:i, name:'Option ' + i})
  }
  return a
}
const bigOptions = getOptions(1000)

const emptyString = ""

export default class Perfomance extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
    }
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
  fp = (i) => {
    let n = 'f'+i
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

  handleSelect = (i) => {
    console.log('select', i)
  }
  
  render() {
    let fp = this.fp
    let i = 0

    return (
      <div style={{width:300, margin: 'auto', padding:'400px 0'}}>

        <h2>Check Perfomance</h2>

        {
          /*
          <MSField {...fp("dd1")} label="Option 1" isMulti={true} options={opts1} />
          <MSField {...fp("dd2")} label="Option 1" hideDropIcon={true} options={opts1} />
          */
        }

        { /*
          <MSField {...fp("dd2")} label="Option 1" options={opts1} isMulti={true}/>
          < MSSelect {...fp("dd1")} label="Option 2" options={sel1} />
          <MSField {...fp("f1")} label="Option 3" />
          */
        }

        <h2>MSSelect</h2>
        <Panel>
          <MSSelect {...fp(i++)} label="State" options={states} />
          <L>error="Error"</L>
          <MSSelect {...fp(i++)} label="State" options={states} error="Error" />
          <L>error="Warning"</L>
          <MSSelect {...fp(i++)} label="State" options={states} warning="Warning" />
          <L>grouped</L>
          <MSSelect {...fp(i++)} label="State" options={statesGroups} />
          <L>emptyValue={"{"}null{"}"}</L>
          <MSSelect {...fp(i++)} label="State" options={states} emptyValue={null} />
        </Panel>

        <h2>MSField with options</h2>
        <Panel>
          <L>1000 options</L>
          <MSField {...fp(i++)} label="options" options={bigOptions} />

          <L>grouped</L>
          <MSField {...fp(i++)} label="options" options={statesGroups} />

          <L>isMulti={"{"}true{"}"}</L>
          <MSField {...fp(i++)} label="options" options={states} isMulti={true} />

          <L>preventFilter={"{"}true{"}"}</L>
          <MSField {...fp(i++)} label="options" options={states} preventFilter={true} />
        </Panel>

      </div>
    )
  }
}