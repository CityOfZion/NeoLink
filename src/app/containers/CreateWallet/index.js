import React, { Component } from 'react'
import { wallet } from '@cityofzion/neon-js'

import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'

import style from './CreateWallet.css'

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

    this.setState({
      loading: true,
      errorMsg: '',
    })

    console.log(this.state.passPhrase)

    if (this.state.passPhrase !== this.state.passPhraseConfirm) {
      this.setState({
        loading: true,
        errorMsg: 'Passphrases do not match.',
      })
    } else {
      console.log('generating new wallet')
      // Make wallet.decrypt() async.
      setTimeout(() => {
        try {
          const account = new wallet.Account(wallet.generatePrivateKey())

          const { WIF, address } = account
          const encryptedWif = wallet.encrypt(WIF, passPhrase)
          // const wif = wallet.decrypt(encryptedWif, passPhrase)
          // this.setState({ loading: false })
          // actions.setAccount(wif)
          this.setState({
            loading: false,
            encryptedWif: encryptedWif,
            address: address,
          })
          console.log(encryptedWif)
          console.log(WIF)
          console.log(address)
        } catch (e) {
          this.setState({ loading: false, errorMsg: e.message })
        }
      }, 500)
    }
  }

  render() {
    return (
      // <div className='content'>
      //   <p className='card-title'>Create Wallet</p>
      //   <button id='createWallet'>Create Wallet</button>
      //   <div id='modalContent' />
      // </div>
      <div>
        <form onSubmit={ this.handleSubmit }>

          <TextField
            type='password'
            placeholder='Passphrase'
            value={ this.state.passPhrase }
            id='passPhrase'
            onChange={ this._handleTextFieldChange }
          />
          <TextField
            type='password'
            placeholder='Confirm Passphrase'
            value={ this.state.passPhraseConfirm }
            id='passPhraseConfirm'
            onChange={ this._handleTextFieldChange }
          />
          <div>
            <Button raised ripple>Create Wallet</Button>

          </div>
        </form>
        {/* {errorMsg !== '' &&
          <div>ERROR: {errorMsg}</div>
        } */}
        <div className='content'>

          {this.state.encryptedWif &&
            <div>
              <div>Encrypted WIF: {this.state.encryptedWif}</div>
              <div>Address: {this.state.address}</div>

              <textarea
                readOnly
                className={ style.textAreaReset }
                rows='20'
                cols='40'
                name='transactionList'
                defaultValue={ 'Encrypted WIF: ' + this.state.encryptedWif + '\nAddress: ' + this.state.address }
              />
            </div>
          }
          {this.state.loading === true &&
            <div>loading...</div>
          }
          {this.state.errorMsg !== '' &&
            <div>ERROR: {this.state.errorMsg}</div>
          }
        </div>

      </div>

    )
  }
}
