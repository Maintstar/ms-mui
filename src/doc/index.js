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


const getOptions = n => {
  const a = []
  for (let i=0; i<n; i++) {
    a.push({id:i, name:'Option ' + i})
  }
  return a
}


export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      d11Id: 2,
      d5: '2',
      // mss1Id: 1,
      // mss2Id: 1,
      // mss3Id: 1,
      // msf1Id: 1,
      // msf2Id: 1,
      // msf3Id: 1
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

        <h1>ms-mui is <a href="https://www.muicss.com/">mui</a> extend 1.0.1</h1>

        <h2>MSSelect</h2>
        <Panel>
          <L>single value, narrow</L>
            <MSSelect {...fp("d1")} label="options" options={[
              {id:1, name:'Option 1'},
              {id:2, name:'Option 2'},
              {id:3, name:'Option 3'},
              {id:4, name:'Option 4'}
            ]} />
          <L>error</L>
          <MSSelect {...fp("d1")} label="options" options={[
            {id:1, name:'Option 1'},
            {id:2, name:'Option 2'},
            {id:3, name:'Option 3'},
            {id:4, name:'Option 4'}
          ]} error="Required" />
          <L>warning</L>
          <MSSelect {...fp("d1")} label="options" options={[
            {id:1, name:'Option 1'},
            {id:2, name:'Option 2'},
            {id:3, name:'Option 3'},
            {id:4, name:'Option 4'}
          ]} warning="Value is not valid" />
          <L>emptyValue</L>
          <MSSelect {...fp("d1")} label="options" options={[
            {id:1, name:'Option 1'},
            {id:2, name:'Option 2'},
            {id:3, name:'Option 3'},
            {id:4, name:'Option 4'}
          ]} emptyValue=" " />
        </Panel>

        <h2>MSField with options</h2>
        <Panel>
        <L>dropdown</L>
        <MSField {...fp("dd1")} label="options" options={[
          {id:1, name:'Option 1'},
          {id:2, name:'Option 2'},
          {id:3, name:'Option 3'},
          {id:4, name:'Option 4'}
        ]} dd={true} />

        <L>init value</L>
        <MSField {...fp("d11")} label="options" options={[
          {id:1, name:'Option 1'},
          {id:2, name:'Option 2'},
          {id:3, name:'Option 3'},
          {id:4, name:'Option 4'}
        ]} />

        <L>group value</L>
        <MSField {...fp("d12")} label="options" options={[
          {id:1, group:'My Address', name:'Option 1'},
          {id:2, group:'My Address', name:'Option 2'},
          {id:3, group:'Other', name:'Option 3'},
          {id:4, group:'Other', name:'Option 4'}
        ]} />

        <L>multi value</L>
        <MSField {...fp("d2")} label="options" options={[
          {id:1, name:'Option 1'},
          {id:2, name:'Option 2'},
          {id:3, name:'Option 3'},
          {id:4, name:'Option 4'}
        ]} isMulti={true} />

        <L>two fields in a row</L>
        <Row>
          <Col xs="6">
            <MSField {...fp("df1")} label="options" options={[
              {id:1, name:'Option 1'},
              {id:2, name:'Option 2'},
              {id:3, name:'Option 3'},
              {id:4, name:'Option 4'}
            ]} />
          </Col>
          <Col xs="6">
            <MSField {...fp("df2")} label="options" options={[
              {id:1, name:'Option 1'},
              {id:2, name:'Option 2'},
              {id:3, name:'Option 3'},
              {id:4, name:'Option 4'}
            ]} />
          </Col>
        </Row>

        <L>big list</L>
        <MSField {...fp("d3")} label="options" options={getOptions(1000)} isMulti={true} />

        <L><b>idCol</b>, <b>nameCol</b></L>
        <MSField {...fp("d4")} label="options" options={[
          {v:1, value:'Option 1'},
          {v:2, value:'Option 2'},
          {v:3, value:'Option 3'},
          {v:4, value:'Option 4'}
        ]} idCol="v" nameCol="value" />

        <L>Filter</L>
        <MSField {...fp("d5")} label="options" options={[
          {v:1, value:'Option 1'},
          {v:2, value:'Option 2'},
          {v:3, value:'Option 3'},
          {v:4, value:'Option 4'}
        ]} idCol="v" nameCol="value" />

        <L>Selected wrong value</L>
        <MSField {...fp("d6")} label="options" options={[
          {v:1, value:'Option 1'},
          {v:2, value:'Option 2'},
          {v:3, value:'Option 3'},
          {v:4, value:'Option 4'}
        ]} idCol="v" nameCol="value" />
        </Panel>

        <h2>MSField</h2>
        <Panel>
          <L>Non floating label</L>
          <MSField {...fp("t1")} label="field label" floatingLabel={false} />

          <L>Floating label</L>
          <MSField {...fp("t2")} label="label" />

          <L>Error field</L>
          <MSField {...fp("t3")} label="label" error="error" />

          <L>Error field with value</L>
          <MSField label="label" error="error" defaultValue="value" />

          <L>Loading field:</L>
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
          <MSField label="Before (to see withing form)" defaultValue="asdf" />

          <L>Simple</L>
          <MSField {...fp("c21")} type="checkbox" label="label" />

          <L>With warning:</L>
          <MSField {...fp("c22")} type="checkbox" label="label" warning="warning text" />

          <MSField label="After (to see withing form)" defaultValue="asdf" />
        </Panel>

        <h2>Small MSSelect</h2>
        <Panel>
          <L></L>
          <MSSelect {...fp("mss1")} label="options" options={[
            {id:1, name:'Option 1'},
            {id:2, name:'Option 2'},
            {id:3, name:'Option 3'},
            {id:4, name:'Option 4'}
          ]} />
          <L>size="s"</L>
          <MSSelect size="s" {...fp("mss2")} label="options" options={[
            {id:1, name:'Option 1'},
            {id:2, name:'Option 2'},
            {id:3, name:'Option 3'},
            {id:4, name:'Option 4'}
          ]} />
          <L>size="xs"</L>
          <MSSelect size="xs" {...fp("mss3")} label="options" options={[
            {id:1, name:'Option 1'},
            {id:2, name:'Option 2'},
            {id:3, name:'Option 3'},
            {id:4, name:'Option 4'}
          ]} />
        </Panel>

        <h2>Small MSField</h2>
        <Panel>
          <L></L>
          <MSField {...fp("msf1")} label="options" options={[
            {id:1, name:'Option 1'},
            {id:2, name:'Option 2'},
            {id:3, name:'Option 3'},
            {id:4, name:'Option 4'}
          ]} />

          <L>size="s"</L>
          <MSField {...fp("msf2")} size="s" label="options" options={[
            {id:1, name:'Option 1'},
            {id:2, name:'Option 2'},
            {id:3, name:'Option 3'},
            {id:4, name:'Option 4'}
          ]} />

          <L>size="xs"</L>
          <MSField {...fp("msf3")} size="xs" label="options" options={[
            {id:1, name:'Option 1'},
            {id:2, name:'Option 2'},
            {id:3, name:'Option 3'},
            {id:4, name:'Option 4'}
          ]} />
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
          <Container>
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