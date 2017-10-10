import React from 'react'
import Panel from './panel'
import propTypes from 'prop-types'
import SwipeHandler from '../components/handlers/swipeHandler'
import './tabList.css'

export default class TabListForm extends React.Component {

  static propTypes = {

  }

  render() {
    return <Panel>
      <TabList>
        <Tab label="Tab 1" active={true}>
          PANE 1
        </Tab>
        <Tab label="Tab 2">
          PANE 2<br/>
          Line 2<br/>
          Line 3
        </Tab>
        <Tab label="Tab 33">
          PANE 3
        </Tab>
      </TabList>
    </Panel>
  }
}

function Tab(props) {
  let { children, ...rest } = props
  return React.createElement("div", rest, children)
}

function TabBut(props) {
  return <div className={"tabs-but " + (props.active ? "tabs-but--active" : "") }>
    {props.children}
  </div>
}

class TabList extends React.Component {

  static propTypes = {

  }

  componentDidMount() {
    let sh = new SwipeHandler({
      touchControl: this.tabs,
      moveControl: this.container
    })
    sh.enable()
  }

  render() {
    const { children, ...rest } = this.props;

    let buts = [];
    let pans = [];

    // iterate childrens to fill buttons and panels
    React.Children.map(children, (child, i) => {
      let { children, label, ...rest } = child.props
      buts.push(<TabBut key={i} {...rest}>{label}</TabBut>)
      pans.push(<div key={i} className="tabs-pan">{children}</div>)
    })

    return <div className="tabs" ref={ (el) => this.tabs = el } {...rest}>
      <div className="tabs-buts">
        { buts }
        <div className="tabs-but-line"></div>
      </div>
      <div className="tabs-cont" ref={ (el) => this.container = el }>
        { pans }
      </div>
    </div>
  }
}

