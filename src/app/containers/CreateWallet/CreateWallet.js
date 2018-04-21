import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'

import PrimaryButton from '../../components/common/buttons/PrimaryButton'
import InputField from '../../components/common/form/InputField'
import Box from '../../components/common/Box'
import CreateWalletSucessPage from '../../components/successPages/CreateWalletSuccessPage'

import { validateLength, labelExists } from '../../utils/helpers'

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

  _labelExists = label => {
    const { accounts } = this.props
    const labelExists = Object.keys(accounts)
      .map(account => {
        return accounts[account].label
      })
      .find(accountLabel => accountLabel === label)

    return !!labelExists
  }

  _validateLabel = () => {
    const { label } = this.state
<<<<<<< HEAD
    const { accounts } = this.props
    const labelDeclared = labelExists(label, accounts)
=======
    const labelExists = this._labelExists(label)
>>>>>>> b709b3fa7e0c6c22347b4e41a8a603c43b661bd8

    if (!validateLength(label, 1)) {
      this._setErrorState('label', 'Account name must be longer than 1.')
      return false
<<<<<<< HEAD
    } else if (labelDeclared) {
=======
    } else if (labelExists) {
>>>>>>> b709b3fa7e0c6c22347b4e41a8a603c43b661bd8
      this._setErrorState('label', 'You already have an account with that label')
      return false
    } else {
      this._setErrorState('label', '')
      return true
    }
  }

  _validatePassPhrase = () => {
    const { passPhrase } = this.state

    if (!validateLength(passPhrase, 10)) {
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
    const { addAccount, manualWIF, setAccount } = this.props

    const validated = this._validate()
    if (validated) {
      this.setState({ loading: true })

      const account = new wallet.Account(manualWIF ? wif : wallet.generatePrivateKey())

      wallet
        .encryptAsync(account.WIF, passPhrase)
        .then(encryptedWif => {
          const accountObject = {
            key: encryptedWif,
            address: account.address,
            label: label,
            isDefault: false,
          }

          addAccount(new wallet.Account(accountObject))

          this.setState(
            {
              loading: false,
              encryptedWif: encryptedWif,
              address: account.address,
            },
            () => setAccount(encryptedWif, account.address)
          )
        })
        .catch(e => {
          this.setState({ loading: false, errorMsg: e.message })
        })
    }
  }

  render() {
    const { loading, errors, passPhrase, passPhraseConfirm, wif, label, encryptedWif, address } = this.state
    const { manualWIF, history } = this.props

    if (loading) {
      return <Loader />
    } else if (encryptedWif) {
      return <CreateWalletSucessPage encryptedWif={ encryptedWif } address={ address } history={ history } />
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
  setAccount: PropTypes.func.isRequired,
  manualWIF: PropTypes.bool,
  history: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
}
