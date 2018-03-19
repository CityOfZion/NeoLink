import React, { Component } from 'react'
import SendInvokeReadonly from '../SendInvoke/SendInvokeReadonly'

import Header from '../../components/Header'
import ContentWrapper from '../../components/ContentWrapper'

import style from '../App/App.css'

export default class PopupWindow extends Component {
  state = {
    success: false,
    transaction: null,
  }

  componentDidMount () {
    this.port = chrome.runtime.connect({ name: 'popup' })
    this.port.onMessage.addListener((message) => {
      if (message.operation === 'POPUP_SEND_INVOKE') {
        this.setState({
          transaction: message.txInfo,
        })
      }
    })
  }

  onSuccess = (response) => {
    this.port.postMessage({ type: 'NEOLINK_SEND_INVOKE_RESPONSE', result: { status: 'success', txid: response.txid } })
  }

  render () {
    const { transaction } = this.state
    return (
      <div className={ style.popup }>
        <Header showMenu={ false } />
        <ContentWrapper>
          { transaction === null
            ? <div>Loading</div>
            : <SendInvokeReadonly transaction={ transaction } onSuccess={ this.onSuccess } />
          }
        </ContentWrapper>
      </div>
    )
  }
}
