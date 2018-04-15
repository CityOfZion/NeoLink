import React, { Component } from 'react'
import { validateLength } from '../../utils/helpers'

export function withCreateAccount(WrappedComponent, accounts) {
  return class extends Component {
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
      const labelExists = Object.keys(accounts)
        .map(account => {
          return accounts[account.label]
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
      } else if (!labelExists) {
        this._setErrorState('label', 'You already have an account with that label')
        return false
      } else {
        this._setErrorState('label', '')
        return true
      }
    }

    render() {
      return (
        <WrappedComponent
          _validateLabel={ this._validateLabel }
          _handleTextFieldChange={ this._handleTextFieldChange }
          _setErrorState={ this._setErrorState }
        />
      )
    }
  }
}
