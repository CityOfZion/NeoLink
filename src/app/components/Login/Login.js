import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'
import { Field, reduxForm } from 'redux-form'

import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import { Select } from 'rmwc/Select'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'
import '@material/select/dist/mdc.select.min.css'

import CreateOrImportWallet from '../CreateOrImportWallet'
import Loader from '../Loader'

export class Login extends Component {
  state = {
    errorMsg: '',
    loading: false,
    encryptedWif: '',
    passPhrase: '',
  }

  _renderTextField = ({
    input,
    ...rest
  }) => (
    <TextField
      { ...input }
      { ...rest }
      onChange={ (event) => input.onChange(event.target.value) }
    />
  )

  _renderSelectField = ({
    input,
    ...rest
  }) => (
    <Select
      { ...input }
      { ...rest }
      onChange={ (event) => input.onChange(event.target.value) }
    />
  )

  handleSubmit = (values, dispatch, formProps) => {
    const { reset } = formProps
    const encryptedWif = values.encryptedWif
    const passPhrase = values.passPhrase

    this.setState({
      loading: true,
      errorMsg: '',
    })

    // Make wallet.decrypt() async.
    setTimeout(() => {
      try {
        const { setAccount } = this.props
        const wif = wallet.decrypt(encryptedWif, passPhrase)
        const account = new wallet.Account(wif)

        this.setState({ loading: false })
        reset()
        setAccount(wif, account.address)
      } catch (e) {
        this.setState({ loading: false, errorMsg: e.message })
      }
    }, 500)
  }

  getAccountOptions(accounts) {
    const options = [ { label: 'Select', value: '' } ]

    Object.keys(accounts).forEach((index) => {
      const account = accounts[index]
      options.push({ label: account.label, value: account.key })
    })

    return options
  }

  render() {
    const { loading, errorMsg } = this.state
    const { accounts, account, handleSubmit } = this.props

    if (loading) {
      return (
        <Loader />
      )
    }
    if (account.wif !== '') {
      return null
    }

    if (Object.keys(accounts).length === 0) {
      return (
        <CreateOrImportWallet />
      )
    }

    return (
      <div>
        <form onSubmit={ handleSubmit(this.handleSubmit) }>
          <Field label='Account'
            component={ this._renderSelectField }
            cssOnly
            name='encryptedWif'
            options={ this.getAccountOptions(accounts) }
          />
          <Field
            component={ this._renderTextField }
            type='password'
            placeholder='Passphrase'
            name='passPhrase'
            id='passPhrase'
          />
          <div>
            <Button raised ripple onClick={ handleSubmit(this.handleSubmit) }>Login</Button>
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
  setAccount: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

export default reduxForm({ form: 'login', destroyOnUnmount: false })(Login)
