import React, { Component } from 'react'
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
  }

  _handleTextFieldChange = (e) => {
    const key = e.target.id
    this.setState({
      [key]: e.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { passPhrase } = this.state

    if (this.state.passPhrase !== this.state.passPhraseConfirm) {
      this.setState({
        loading: false,
        errorMsg: 'Passphrases do not match.',
      })

      return
    }

    if (this.state.passPhrase.length < 10) {
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
        const account = new wallet.Account(wallet.generatePrivateKey())

        const { WIF, address } = account
        const encryptedWif = wallet.encrypt(WIF, passPhrase)

        this.setState({
          loading: false,
          encryptedWif: encryptedWif,
          address: address,
        })
      } catch (e) {
        this.setState({ loading: false, errorMsg: e.message })
      }
    }, 500)
  }

  render() {
    const { loading, errorMsg, passPhrase, passPhraseConfirm, encryptedWif, address } = this.state

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
