import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as NetworkActions from '../../actions/network'

import style from './NetworkSwitcher.css'

@connect(
  state => ({
    network: state.network
  }),
  dispatch => ({
    actions: bindActionCreators(NetworkActions, dispatch)
  })
)

export default class NetworkSwitcher extends Component {
  change = (event) => {
    const { actions } = this.props;
    actions.switchNetwork(event.target.value)
  }

  render () {
    const { network, actions } = this.props
    return (
      <div>
        <select className={style.switcher} defaultValue={network.name} onChange={this.change}>
          <option value='TestNet'>TestNet</option>
          <option value='MainNet'>MainNet</option>
        </select>
      </div>
    )
  }
}
