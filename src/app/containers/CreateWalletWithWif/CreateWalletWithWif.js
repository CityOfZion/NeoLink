import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { wallet } from '@cityofzion/neon-js'
import { validateLength } from '../../utils/helpers'

import Box from '../../components/common/Box'
import InputField from '../../components/common/form/InputField'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'

import style from './CreateWalletWithWif.css'

class CreateWalletWithWif extends Component {
  state = {
    encryptedWif: '',
    passPhrase: '',
    address: '',
    label: '',
    errors: {
      wif: '',
      passPhrase: '',
      label: '',
    },
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
    const labelExists = this._labelExists(label)

    if (!validateLength(label, 1)) {
      this._setErrorState('label', 'Account name must be longer than 1.')
      return false
    } else if (labelExists) {
      this._setErrorState('label', 'You already have an account with that label')
      return false
    } else {
      this._setErrorState('label', '')
      return true
    }
  }

  _handleTextFieldChange = e => {
    const key = e.target.id

    this._clearErrors(key)
    this.setState({
      [key]: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { encryptedWif, passPhrase, label } = this.state
    const { setAccount, addAccount, history } = this.props

    const validated = this._validateLabel(label)

    if (validated) {
      wallet
        .decryptAsync(encryptedWif, passPhrase)
        .then(wif => {
          const account = new wallet.Account(wif)

          const accountObject = {
            key: encryptedWif,
            address: account.address,
            label: label,
            isDefault: false,
          }

          this.setState({ address: account.address, encryptedWif: wif }, () => {
            addAccount(new wallet.Account(accountObject))
            setAccount(wif, account.address)
            history.push('/home')
          })
        })
        .catch(() => this._setErrorState('passPhrase', 'Wrong password or encrypted key'))
    }
  }

  render() {
    const { encryptedWif, passPhrase, label, errors } = this.state
    return (
      <section className={ style.createWalletWithWifWrapper }>
        <Box>
          <h1 className={ style.createWalletWithWifHeading }>Create wallet with encrypted key</h1>
          <form className={ style.createWalletWithWifForm } onSubmit={ this.handleSubmit }>
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
              value={ encryptedWif }
              id='encryptedWif'
              onChangeHandler={ this._handleTextFieldChange }
              label='Encrypted key'
              error={ '' }
            />
            <InputField
              type='password'
              value={ passPhrase }
              id='passPhrase'
              onChangeHandler={ this._handleTextFieldChange }
              label='Password'
              error={ errors.passPhrase }
            />
            <PrimaryButton buttonText={ 'Create' } classNames={ style.createWalletWithWifButton } />
          </form>
        </Box>
      </section>
    )
  }
}

CreateWalletWithWif.propTypes = {
  addAccount: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
}

export default CreateWalletWithWif
