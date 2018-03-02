import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'

import Loader from '../Loader'
import * as AccountActions from '../../actions/account'

@connect(
  state => ({
    account: state.account,
  }),
  dispatch => ({
    actions: bindActionCreators(AccountActions, dispatch),
  })
)

export default class Login extends Component {
  state = {
    errorMsg: '',
    loading: false,
    encryptedWif: '',
    passPhrase: '',
  }

  _handleTextFieldChange = (e) => {
    const key = e.target.id
    this.setState({
      [key]: e.target.value,
    })
  }

  decryptWallet = (encryptedWif, passphrase) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const wif = wallet.decrypt(encryptedWif, passphrase)

        if (!wif) {
          reject(new Error('Couldn\'t load account'))
        } else {
          resolve(wif)
        }
      }, 1)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { encryptedWif, passPhrase } = this.state
    this.setState({
      loading: true,
      errorMsg: '',
    })

    // Make wallet.decrypt() async.
    setTimeout(() => {
      try {
        const { actions } = this.props

        const wif = wallet.decrypt(encryptedWif, passPhrase)
        this.setState({ loading: false })
        actions.setAccount(wif)
      } catch (e) {
        this.setState({ loading: false, errorMsg: e.message })
      }
    }, 500)
  }

  render() {
    const { loading, errorMsg } = this.state
    const { account } = this.props

    if (loading) {
      return (
        <Loader />
      )
    }
    if (account.wif !== '') {
      return null
    }
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <TextField
            type='text'
            placeholder='Encrypted WIF'
            value={ this.state.encryptedWif }
            id='encryptedWif'
            onChange={ this._handleTextFieldChange }
          />
          <TextField
            type='password'
            placeholder='Passphrase'
            value={ this.state.passPhrase }
            id='passPhrase'
            onChange={ this._handleTextFieldChange }
          />
          <div>
            <Button raised ripple>Login</Button>
          </div>
        </form>
        {errorMsg !== '' &&
          <div>ERROR: {errorMsg}</div>
        }
      </div>
    )
  }
}

Login.propTypes = {
  actions: PropTypes.object,
  account: PropTypes.object,
}
