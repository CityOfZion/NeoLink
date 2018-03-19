import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'

import PrimaryButton from '../../components/common/buttons/PrimaryButton'
import InputField from '../../components/common/form/InputField'
import Box from '../../components/common/Box'

import style from './CreateWallet.css'
import Loader from '../../components/Loader'

export default class CreateWallet extends Component {
  state = {
    errors: {
      wif: '',
      label: '',
      passPhrase: '',
      passPhraseConfirm: '',
    },
    loading: false,
    encryptedWif: '',
    passPhrase: '',
    passPhraseConfirm: '',
    label: '',
    address: '',
    wif: '',
  }

  _clearErrors(key) {
    this._setErrorState(key, '')
  }

  _setErrorState = (key, value) => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [key]: value,
      },
    }))
  }

  _handleTextFieldChange = e => {
    const key = e.target.id

    this._clearErrors(key)
    this.setState({
      [key]: e.target.value,
    })
  }

  _validateLabel = () => {
    const { label } = this.state

    if (!label || label.length < 1) {
      this._setErrorState('label', 'Account name must be longer than 1.')
      return false
    } else {
      this._setErrorState('label', '')
      return true
    }
  }

  _validatePassPhrase = () => {
    const { passPhrase } = this.state

    if (!passPhrase || passPhrase.length < 10) {
      this._setErrorState('passPhrase', 'Passphrase must be longer than 10 characters.')
      return false
    } else {
      this._setErrorState('passPhrase', '')
      return true
    }
  }

  _validatePasswordMatch = () => {
    const { passPhrase, passPhraseConfirm } = this.state

    if (!passPhrase || !passPhraseConfirm || passPhrase !== passPhraseConfirm) {
      this._setErrorState('passPhraseConfirm', 'Passphrases do not match.')
      return false
    } else {
      this._setErrorState('passPhraseConfirm', '')
      return true
    }
  }

  _validateWIF = () => {
    const { wif } = this.state
    const { manualWIF } = this.props

    if (manualWIF && !wallet.isWIF(wif)) {
      this._setErrorState('wif', 'Invalid WIF')
      return false
    } else {
      this._setErrorState('wif', '')
      return true
    }
  }

  _validate = () => {
    const labelValidated = this._validateLabel()
    const passPhraseValidated = this._validatePassPhrase()
    const passPhraseMatchValidated = this._validatePasswordMatch()
    const wifValidated = this._validateWIF()

    if (labelValidated && passPhraseValidated && passPhraseMatchValidated && wifValidated) {
      return true
    }
    return false
  }

  handleSubmit = event => {
    event.preventDefault()

    const { label, passPhrase, wif } = this.state
    const { addAccount, manualWIF } = this.props

    const validated = this._validate()

    if (validated) {
      this.setState({
        loading: true,
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
  }

  render() {
    const { loading, errors, passPhrase, passPhraseConfirm, wif, label, encryptedWif, address } = this.state
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
                label='Wif'
                error={ errors.wif }
              />
            )}
            <InputField
              type='input'
              value={ label }
              id='label'
              onChangeHandler={ this._handleTextFieldChange }
              label='Account Name'
              error={ errors.label }
            />
            <InputField
              type='password'
              value={ passPhrase }
              id='passPhrase'
              onChangeHandler={ this._handleTextFieldChange }
              label='Password'
              error={ errors.passPhrase }
            />
            <InputField
              type='password'
              value={ passPhraseConfirm }
              id='passPhraseConfirm'
              onChangeHandler={ this._handleTextFieldChange }
              label='Confirm Password'
              error={ errors.passPhraseConfirm }
            />

            <PrimaryButton buttonText={ 'Create' } classNames={ style.createWalletButton } />
          </form>
        </Box>
      </section>
    )
  }
}

CreateWallet.propTypes = {
  addAccount: PropTypes.func.isRequired,
  manualWIF: PropTypes.bool,
}
