import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'
import { Button } from 'rmwc/Button'
import '@material/button/dist/mdc.button.min.css'

export default class ImportWallet extends Component {
  state = {
    importAccounts: [],
    errorMsg: '',
    success: false,
  }

  importWallet = (event) => {
    const { importAccounts } = this.state
    const { addAccount } = this.props
    const failedAccounts = []

    event.preventDefault()

    importAccounts.forEach(function(accountObject) {
      try {
        addAccount(new wallet.Account(accountObject))
      } catch (e) {
        failedAccounts.push(accountObject.label)
      }
    })

    if (failedAccounts.length === 0) {
      this.setState({
        importAccounts: [],
        errorMsg: '',
        success: true,
      })
    } else {
      this.setState({
        importAccounts: [],
        errorMsg: 'The following accounts were not imported: "' + failedAccounts.map(act => `"${act}"`).join(', ') + '"',
        success: false,
      })
    }
  }

  readerOnload = (fileContents) => {
    try {
      const importObject = JSON.parse(fileContents)

      if (importObject && importObject.accounts && importObject.accounts.length > 0) {
        this.setState({
          success: false,
          errorMsg: '',
          importAccounts: importObject.accounts,
        })
      } else {
        this.setState({
          importAccounts: [],
          success: false,
          errorMsg: 'Unable to read accounts in imported wallet',
        })
      }
    } catch (e) {
      this.setState({
        importAccounts: [],
        success: false,
        errorMsg: 'Unable to parse JSON',
      })
    }
  }

  handleFileUpload = (e) => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      this.readerOnload(reader.result)
    })
    reader.readAsText(e.target.files[0])
  }

  render() {
    const { errorMsg, importAccounts, success } = this.state

    return (
      <div>
        <form onSubmit={ this.importWallet }>
          <div>
            <input type='file' id='file' onChange={ this.handleFileUpload } />
            { importAccounts.length > 0 &&
              <div>{importAccounts.length} accounts found</div>
            }
            { success === true &&
              <div>Import successful!</div>
            }
            <Button raised ripple disabled={ importAccounts.length === 0 }>Import Wallet</Button>
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

ImportWallet.propTypes = {
  addAccount: PropTypes.func.isRequired,
}
