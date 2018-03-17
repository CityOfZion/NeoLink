import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { wallet } from '@cityofzion/neon-js'
import { Field, reduxForm } from 'redux-form'

import SelectBox from '../common/form/SelectBox'
import InputField from '../common/form/InputField'
import PrimaryButton from '../common/buttons/PrimaryButton'
import Box from '../common/Box'

import Loader from '../Loader'
import StartPage from '../StartPage'

import style from './Login.css'

export class Login extends Component {
  state = {
    errorMsg: '',
    loading: false,
    encryptedWif: '',
    passPhrase: '',
  }

  _renderTextField = ({ input, ...rest }) => (
    <InputField
      { ...input }
      { ...rest }
      error={ this.state.errorMsg }
      label='Password'
      onChangeHandler={ event => {
        this.setState(prevState => ({ errorMsg: '' }))
        input.onChange(event.target.value)
      } }
    />
  )

  _renderSelectField = ({ input, ...rest }) => (
    <SelectBox { ...input } { ...rest } onChangeHandler={ event => input.onChange(event.target.value) } />
  )

  handleSubmit = (values, dispatch, formProps) => {
    const { history } = this.props
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
        history.push('/home')
      } catch (e) {
        this.setState({ loading: false, errorMsg: e.message })
      }
    }, 500)
  }

  getAccountOptions(accounts) {
    const options = [{ label: 'Select Account', value: '' }]

    Object.keys(accounts).forEach(index => {
      const account = accounts[index]
      options.push({ label: account.label, value: account.key })
    })

    return options
  }

  render() {
    const { loading } = this.state
    const { accounts, account, handleSubmit } = this.props

    if (loading) {
      return <Loader />
    }
    if (account.wif !== '') {
      return null
    }

    if (Object.keys(accounts).length === 0) {
      return <StartPage />
    }

    return (
      <section className={ style.loginWrapper }>
        <Box>
          <h1 className={ style.loginHeading }>Login</h1>
          <form onSubmit={ handleSubmit(this.handleSubmit) } className={ style.loginForm }>
            <Field
              label='Account'
              component={ this._renderSelectField }
              cssOnly
              name='encryptedWif'
              options={ this.getAccountOptions(accounts) }
            />
            <Field component={ this._renderTextField } type='password' name='passPhrase' id='passPhrase' />
            <div>
              <PrimaryButton classNames={ style.loginButton } buttonText={ 'Login' } />
            </div>
          </form>
        </Box>
      </section>
    )
  }
}

Login.propTypes = {
  setAccount: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  history: PropTypes.object,
}

export default reduxForm({ form: 'login', destroyOnUnmount: false })(Login)
