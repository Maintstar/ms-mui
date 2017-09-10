import React from 'react'
import MSField from '../components/msField'
import MSSelect from '../components/msSelect'
import Button from '../components/button'
import Table from '../components/table'
import Row from '../components/row'
import Col from '../components/col'
import Container from '../components/container'
import Panel from '../components/panel'

import L from './components/label'
import './index.css'


var states = [
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

var statesGroups = [
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
var bigOptions = getOptions(1000)

var sel1 = [
  {id:1, name:'Option 1'},
  {id:2, name:'Option 2'},
  {id:3, name:'Option 3'},
  {id:4, name:'Option 4'}
]

var statesOtherCol = [
  {id2:'AL', name2:'Alabama', group2: 'A'},
  {id2:'AK', name2:'Alaska', group2: 'A'},
  {id2:'AZ', name2:'Arizona', group2: 'A'},
  {id2:'AR', name2:'Arkansas', group2: 'A'},
  {id2:'CA', name2:'California', group2: 'C'},
  {id2:'CO', name2:'Colorado', group2: 'C'},
  {id2:'CT', name2:'Connecticut', group2: 'C'},
  {id2:'DE', name2:'Delaware', group2: 'D'}
]




export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  onChange = (ev) => {
    let v = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value
    const s = {...this.state, [ev.target.name]: v}
    //if (v == null || v === '') delete s[ev.target.name]
    this.setState(s)
    console.log('onChange form: ', s);
  }

  onSelected = (id, o, t) => {
    console.log('onSelected form start');
    const s = {...this.state, [t.props.name + 'Id']: id}
    //if (id == null || id === '') s[k] = null
    this.setState(s)
    console.log('onSelected form: ',s);
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
      <div style={{width:300, margin: 'auto'}}>

        <h1>ms-mui is <a href="https://www.muicss.com/">mui</a> extend</h1>

        <p>
          Check this page <a href="https://github.com/Maintstar/ms-mui/blob/master/src/doc/index.js">source file</a> with usage details
        </p>

        <h2>MSSelect</h2>
        <Panel>
          <MSSelect {...fp("sel1")} label="State" options={states} />
          <L>error="Error"</L>
          <MSSelect {...fp("sel2")} label="State" options={states} error="Error" />
          <L>error="Warning"</L>
          <MSSelect {...fp("sel3")} label="State" options={states} warning="Warning" />
          <L>grouped</L>
          <MSSelect {...fp("sel4")} label="State" options={statesGroups} />
          <L>emptyValue={"{"}null{"}"}</L>
          <MSSelect {...fp("sel5")} label="State" options={states} emptyValue={null} />
          <L>idCol="id2", nameCol="name2", groupCol="group2"</L>
          <MSSelect {...fp("sel5")} label="State" options={statesOtherCol} emptyValue={null} 
            idCol="id2" nameCol="name2" groupCol="group2" />
        </Panel>

        <h2>MSField with options</h2>
        <Panel>
          <L>1000 options</L>
          <MSField {...fp("msf6")} label="options" options={bigOptions} />

          <L>grouped</L>
          <MSField {...fp("msf3")} label="options" options={statesGroups} />

          <L>isMulti={"{"}true{"}"}</L>
          <MSField {...fp("msf4")} label="options" options={states} isMulti={true} />

          <L>preventFilter={"{"}true{"}"}</L>
          <MSField {...fp("msf5")} label="options" options={states} preventFilter={true} />

          <L>idCol="id2", nameCol="name2", groupCol="group2"</L>
          <MSField {...fp("msf1")} label="options" options={statesOtherCol} idCol="id2" nameCol="name2" groupCol="group2" />
        </Panel>

        <h2>MSField</h2>
        <Panel>
          <MSField {...fp("t2")} label="label" />

          <L>error="error"</L>
          <MSField {...fp("t3")} label="label" error="error" />

          <L>isLoading={"{"}true{"}"}</L>
          <MSField {...fp("t4")} label="loading" isLoading={true} />
        </Panel>

        <h2>MSField checkbox</h2>
        <p>among empty Fields</p>
        <Panel>
          <MSField {...fp("cf1")} label="Before (to see withing form)" />

          <L>Simple</L>
          <MSField {...fp("c1")} type="checkbox" label="label" />

          <L>With error:</L>
          <MSField {...fp("c2")} type="checkbox" label="label" error="error text" />

          <MSField {...fp("cf2")} label="After (to see withing form)" />
        </Panel>

        <h2>MSField checkbox</h2>
        <p>among filled Fields</p>
        <Panel>
          <MSField {...fp("c20")} label="Before (to see withing form)" defaultValue="asdf" />

          <L>Simple</L>
          <MSField {...fp("c21")} type="checkbox" label="label" />

          <L>With warning:</L>
          <MSField {...fp("c22")} type="checkbox" label="label" warning="warning text" />

          <MSField {...fp("c23")} label="After (to see withing form)" defaultValue="asdf" />
        </Panel>

        <h2>Small MSSelect</h2>
        <Panel>
          <L></L>
          <MSSelect {...fp("mss1")} label="options" options={states} />
          <L>size="s"</L>
          <MSSelect size="s" {...fp("mss2")} label="options" options={states} />
          <L>size="xs"</L>
          <MSSelect size="xs" {...fp("mss3")} label="options" options={states} />
        </Panel>

        <h2>Small MSField</h2>
        <Panel>
          <L></L>
          <MSField {...fp("msf1")} label="options" options={states} />

          <L>size="s"</L>
          <MSField {...fp("msf2")} size="s" label="options" options={states} />

          <L>size="xs"</L>
          <MSField {...fp("msf3")} size="xs" label="options" options={states} />
        </Panel>

        <h2>Small Button</h2>
        <Panel>
          <L></L>
          <Button variant="raised" color="primary">Primary</Button><br/>

          <L>Button.small</L>
          <Button size="s" variant="raised" color="primary">Primary</Button><br/>

          <L>Button.xsmall</L>
          <Button size="xs" variant="raised" color="primary">Primary</Button><br/>
        </Panel>

        <h2>Small Tables</h2>
        <Panel>
          <L>size="n"</L>
          <Table size="n">
            <thead>
              <tr>
                <th>Column 1</th>
                <th>Column 2</th>
              </tr>
              </thead>
            <tbody>
              <tr>
                <td>Cell 1-1</td>
                <td>Cell 1-2</td>
              </tr>
              <tr>
                <td>Cell 2-1</td>
                <td>Cell 2-2</td>
              </tr>
            </tbody>
          </Table>
          <L>size="s"</L>
          <Table size="s">
            <thead>
              <tr>
                <th>Column 1</th>
                <th>Column 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cell 1-1</td>
                <td>Cell 1-2</td>
              </tr>
              <tr>
                <td>Cell 2-1</td>
                <td>Cell 2-2</td>
              </tr>
            </tbody>
          </Table>
          <L>size="xs"</L>
          <Table size="xs">
            <thead>
              <tr>
                <th>Column 1</th>
                <th>Column 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cell 1-1</td>
                <td>Cell 1-2</td>
              </tr>
              <tr>
                <td>Cell 2-1</td>
                <td>Cell 2-2</td>
              </tr>
            </tbody>
          </Table>
        </Panel>

        <h2>Small Grid</h2>
        <Panel className="grid-example">
          <L></L>
          <Container className="custom">
            <Row>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
            </Row>
            <Row>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
            </Row>
            <Row>
              <Col md="6">md-6</Col>
              <Col md="6">md-6</Col>
            </Row>
          </Container>
          <L>size="s"</L>
          <Container size="s">
            <Row>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
            </Row>
            <Row>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
            </Row>
            <Row>
              <Col md="6">md-6</Col>
              <Col md="6">md-6</Col>
            </Row>
          </Container>
          <L>size="xs"</L>
          <Container size="xs">
            <Row>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
            </Row>
            <Row>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
            </Row>
            <Row>
              <Col md="6">md-6</Col>
              <Col md="6">md-6</Col>
            </Row>
          </Container>
          <L>size="none"</L>
          <Container size="none">
            <Row>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
            </Row>
            <Row>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
            </Row>
            <Row>
              <Col md="6">md-6</Col>
              <Col md="6">md-6</Col>
            </Row>
          </Container>
          text
        </Panel>

        <h2>Small Grid nopad</h2>
        <Panel className="grid-example">
          <L>nopad=1</L>
          <Container nopad="1">
            <Row>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
            </Row>
            <Row>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
            </Row>
            <Row>
              <Col md="6">md-6</Col>
              <Col md="6">md-6</Col>
            </Row>
          </Container>
          <L>size="s" nopad="1"</L>
          <Container size="s" nopad="1">
            <Row>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
            </Row>
            <Row>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
            </Row>
            <Row>
              <Col md="6">md-6</Col>
              <Col md="6">md-6</Col>
            </Row>
          </Container>
          <L>size="xs" nopad="1"</L>
          <Container size="xs" nopad="1">
            <Row>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
            </Row>
            <Row>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
            </Row>
            <Row>
              <Col md="6">md-6</Col>
              <Col md="6">md-6</Col>
            </Row>
          </Container>
          <L>size="none" nopad="1"</L>
          <Container size="none" nopad="1">
            <Row>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
              <Col md="3">md-3</Col>
            </Row>
            <Row>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
              <Col md="4">md-4</Col>
            </Row>
            <Row>
              <Col md="6">md-6</Col>
              <Col md="6">md-6</Col>
            </Row>
          </Container>
          text
        </Panel>

        <h2 style={{margin:'100px 0', textAlign:'center'}}>That's all folks</h2>

      </div>
    )
  }
}