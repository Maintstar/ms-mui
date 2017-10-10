import React from 'react'
import Panel from './panel'
import propTypes from 'prop-types'
import SwipeHandler from '../components/handlers/swipeHandler'
import './panelList.css'

export default class PanelListForm extends React.Component {

  static propTypes = {

  }

  render() {
    return <div>
      <PanelList>
        <div>PANE 1</div>
        <div>PANE 2 <br/> Line 2<br/> Line 3</div>
        <div>PANE 3</div>
      </PanelList>
      <Panel>PANE 1</Panel>
    </div>
  }

}

class PanelList extends React.Component {

  static propTypes = {

  }

  componentDidMount() {
    let sh = new SwipeHandler({
      touchControl: this.panel,
      moveControl: this.container
    })
    sh.enable()
  }

  render() {
    const { children, ...rest } = this.props;
    return <div>
      <div ref={ (el) => this.panel = el } className="panel-list" {...rest}>
        <div ref={ (el) => this.container = el }>
        {
          React.Children.map(children, (child) =>
            <Panel>
              {child}
            </Panel>
          )
        }
        </div>
      </div>
    </div>
  }
}

