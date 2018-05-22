import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'

import Box from '../../components/common/Box'
import FileUpload from '../../components/FileUpload'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'
import ImportWalletSuccessPage from '../../components/successPages/ImportWalletSuccessPage'
import ErrorCard from '../../components/errors/ErrorCard'
import ImportWalletInfo from '../../components/ImportWalletInfo'

import style from './ImportWallet.css'

export default class ImportWallet extends Component {
  state = {
    importAccounts: [],
    errorMsg: '',
    success: false,
  }

  importWallet = event => {
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
        errorMsg:
          'The following accounts were not imported: "' + failedAccounts.map(act => `"${act}"`).join(', ') + '"',
        success: false,
      })
    }
  }

  readerOnload = fileContents => {
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

  handleFileUpload = e => {
    // eslint-disable-next-line no-undef
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      this.readerOnload(reader.result)
    })
    reader.readAsText(e.target.files[0])
  }

  render() {
    const { errorMsg, importAccounts, success } = this.state
    const { history } = this.props

    return (
      <section className={ style.importWallet }>
        {success && <ImportWalletSuccessPage history={ history } title={ 'Successfully imported wallet(s)' } />}
        {!success && (
          <Box>
            <h1 className={ style.importWalletHeading }>Import Wallet</h1>
            {importAccounts.length === 0 && (
              <p className={ style.importWalletSubtitle }>Click to upload your JSON keystore file.</p>
            )}
            <form onSubmit={ this.importWallet }>
              <Fragment>
                {importAccounts.length === 0 && <FileUpload onChangeHandler={ this.handleFileUpload } />}
                {importAccounts.length > 0 && <ImportWalletInfo numWallets={ importAccounts.length } />}

                {importAccounts.length > 0 && (
                  <PrimaryButton buttonText='Import Wallets' classNames={ style.importAccountsButton } />
                )}
              </Fragment>
            </form>
            {errorMsg && <ErrorCard message={ errorMsg } onClickHandler={ () => this.setState({ errorMsg: '' }) } />}
          </Box>
        )}
      </section>
    )
  }
}

ImportWallet.propTypes = {
  addAccount: PropTypes.func.isRequired,
  history: PropTypes.object,
}
