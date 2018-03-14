import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'
import { Button } from 'rmwc/Button'
import '@material/button/dist/mdc.button.min.css'

export default class ExportWallet extends Component {
  state = {
    errorMsg: '',
  }

  exportWallet = (event) => {
    event.preventDefault()

    const { accounts } = this.props

    try {
      const walletObject = new wallet.Wallet({ name: 'neoLinkWallet', accounts: Object.values(accounts) })

      // eslint-disable-next-line no-undef
      const blob = new Blob([ walletObject.export() ], { type: 'text/plain' })
      // eslint-disable-next-line no-undef
      const url = URL.createObjectURL(blob)

      chrome.downloads.download({
        url: url,
        filename: 'NeoLinkWallet.json',
        saveAs: true,
      }, downloadId => {
        if (!downloadId) {
          this.setState({
            // eslint-disable-next-line no-undef
            errorMsg: runtime.lastError,
          })
        }
      })
    } catch (e) {
      this.setState({
        errorMsg: e.message,
      })
    }
  }

  render() {
    const { errorMsg } = this.state
    const { accounts } = this.props

    if (Object.keys(accounts).length === 0) {
      return <div>You have no stored accounts</div>
    }

    return (
      <div>
        <form onSubmit={ this.exportWallet }>
          <div>
            <Button raised ripple>Export Wallet</Button>
          </div>
        </form>

        <div className='content'>
          {this.state.errorMsg !== '' &&
            <div>ERROR: {errorMsg}</div>
          }
        </div>
      </div>
    )
  }
}

ExportWallet.propTypes = {
  accounts: PropTypes.object.isRequired,
}
