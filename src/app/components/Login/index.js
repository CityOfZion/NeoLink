import React, { Component } from 'react'
import Neon, { wallet } from '@cityofzion/neon-js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from 'preact-material-components/Button'
import 'preact-material-components/Button/style.css'
import 'preact-material-components/Theme/style.css'

import * as AccountActions from '../../actions/account'

@connect(
  state => ({
    account: state.account
  }),
  dispatch => ({
    actions: bindActionCreators(AccountActions, dispatch)
  })
)

export default class Login extends Component {
  state = {
    errorMsg: '',
    loading: false
  }

  decryptWallet = (encryptedWif, passphrase) => {
    return new Promise((resolve, reject) => {
      const wif = wallet.decrypt(encryptedWif, passphrase)

      if (!wif) {
        reject(new Error("Couldn't load account"))
      } else {
        resolve(wif)
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({
      loading: true,
      errorMsg: ''
    })

    this.decryptWallet(this.encryptedWif.value, this.passphrase.value)
      .then((wif) => {
        const { actions } = this.props
        this.setState({ loading: false })
        actions.setAccount(wif)
      })
      .catch((e) => {
        this.setState({ loading: false, errorMessage: 'Incorrect credentials.' })
      })
  }

  handleClick = (e) => {
    const { actions } = this.props
    e.preventDefault()
    actions.setAccount('')
  }

  render () {
    const { loading, errorMsg } = this.state
    const { account } = this.props

    if (account.wif !== '') {
      const myAccount = Neon.create.account(account.wif)
      return (
        <div>
          <p>Logged In</p>
          <Button ripple raised onClick={this.handleClick}>
            Logout
          </Button>
          <div>Address: {myAccount.address}</div>
          <div>Public key encoded: {myAccount.getPublicKey(true)}</div>
        </div>
      )
    }
    return (
      <div>
        <p>Login</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Encrypted WIF'
            ref={(input) => { this.encryptedWif = input }}
          />
          <input
            type='password'
            placeholder='Passphrase'
            ref={(input) => { this.passphrase = input }}
          />
          <button>Login</button>
        </form>
        { loading &&
          <div>Loading...</div>
        }
        { errorMsg !== '' &&
          <div>ERROR: {errorMsg}</div>
        }
      </div>
    )
  }
}
