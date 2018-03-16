import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'

// import { Button } from 'rmwc/Button'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'
import InputField from '../../components/common/form/InputField'
import Box from '../../components/common/Box'

import style from './CreateWallet.css'
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

  _handleTextFieldChange = e => {
    const key = e.target.id
    this.setState({
      [key]: e.target.value,
    })
  }

  handleSubmit = event => {
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
          <div>${encryptedWif}</div>
          <div>Address:</div>
          <div>${address}</div>
        </div>
      )
    }

    return (
      <section className={ style.createWalletWrapper }>
        <Box>
          <h1 className={ style.createWalletHeading }>Create Wallet</h1>
          <form onSubmit={ this.handleSubmit } className={ style.createWalletForm }>
            {manualWIF && (
              <InputField
                type='password'
                value={ wif }
                id='wif'
                onChangeHandler={ this._handleTextFieldChange }
                label='Password'
              />
            )}
            <InputField
              type='input'
              value={ label }
              id='label'
              onChangeHandler={ this._handleTextFieldChange }
              label='Account Name'
            />
            <InputField
              type='password'
              value={ passPhrase }
              id='passPhrase'
              onChangeHandler={ this._handleTextFieldChange }
              label='Password'
            />
            <InputField
              type='password'
              value={ passPhraseConfirm }
              id='passPhraseConfirm'
              onChangeHandler={ this._handleTextFieldChange }
              label='Confirm Password'
            />

            <PrimaryButton buttonText={ 'Create' } classNames={ style.createWalletButton } />
          </form>

          <div className='content'>{this.state.errorMsg !== '' && <div>ERROR: {errorMsg}</div>}</div>
        </Box>
      </section>
    )
  }
}

CreateWallet.propTypes = {
  addAccount: PropTypes.func.isRequired,
  manualWIF: PropTypes.bool,
}
