import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'

import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'

import globalStyle from '../../components/ContentWrapper/ContentWrapper.css'
import Loader from '../../components/Loader'

export default class CreateWallet extends Component {
  state = {
    errorMsg: '',
    loading: false,
    encryptedWif: '',
    passPhrase: '',
    passPhraseConfirm: '',
    address: '',
    wif: '',
  }

  _handleTextFieldChange = (e) => {
    const key = e.target.id
    this.setState({
      [key]: e.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { label, passPhrase, wif, passPhraseConfirm } = this.state
    const { addAccount, manualWIF } = this.props

    if (manualWIF && !wallet.isWIF(wif)) {
      this.setState({
        loading: false,
        errorMsg: 'Invalid WIF',
      })

      return
    }

    if (passPhrase !== passPhraseConfirm) {
      this.setState({
        loading: false,
        errorMsg: 'Passphrases do not match.',
      })

      return
    }

    if (passPhrase.length < 10) {
      this.setState({
        loading: false,
        errorMsg: 'Passphrases must be at least 10 characters',
      })

      return
    }

    this.setState({
      loading: true,
      errorMsg: '',
    })

    // Make wallet.decrypt() async.
    setTimeout(() => {
      try {
        const account = new wallet.Account(manualWIF ? wif : wallet.generatePrivateKey())
        const encryptedWif = wallet.encrypt(account.WIF, passPhrase)

        const accountObject = {
          key: encryptedWif,
          address: account.address,
          label: label,
          isDefault: false,
        }

        addAccount(new wallet.Account(accountObject))

        this.setState({
          loading: false,
          encryptedWif: encryptedWif,
          address: account.address,
        })
      } catch (e) {
        this.setState({ loading: false, errorMsg: e.message })
      }
    }, 500)
  }

  render() {
    const { loading, errorMsg, passPhrase, passPhraseConfirm, wif, label, encryptedWif, address } = this.state
    const { manualWIF } = this.props

    if (loading) {
      return <Loader />
    } else if (encryptedWif) {
      // handle success
      return (
        <div className='content'>
          <div>Wallet created!</div>
          <div>Encrypted WIF:</div>
          <div className={ globalStyle.breakWord }>${encryptedWif}</div>
          <div>Address:</div>
          <div className={ globalStyle.breakWord }>${address}</div>
        </div>
      )
    }

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          { manualWIF &&
            <TextField
              type='password'
              placeholder='WIF'
              value={ wif }
              id='wif'
              onChange={ this._handleTextFieldChange }
            />
          }
          <TextField
            type='input'
            placeholder='Label'
            value={ label }
            id='label'
            onChange={ this._handleTextFieldChange }
          />
          <TextField
            type='password'
            placeholder='Passphrase'
            value={ passPhrase }
            id='passPhrase'
            onChange={ this._handleTextFieldChange }
          />
          <TextField
            type='password'
            placeholder='Confirm Passphrase'
            value={ passPhraseConfirm }
            id='passPhraseConfirm'
            onChange={ this._handleTextFieldChange }
          />
          <div>
            <Button raised ripple>Create Wallet</Button>
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

CreateWallet.propTypes = {
  addAccount: PropTypes.func.isRequired,
  manualWIF: PropTypes.bool,
}
