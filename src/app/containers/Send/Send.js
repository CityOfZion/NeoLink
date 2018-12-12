import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { wallet } from '@cityofzion/neon-js'

import { getBalance, getAccountName, sendAsset } from '../../utils/api/neon'

import AccountInfo from '../../components/AccountInfo'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'
import sendSVG from '../../../img/paper-planeSolidWhite.svg'
import Loader from '../../components/Loader'
import ErrorCard from '../../components/errors/ErrorCard'
import SendSuccessPage from '../../components/successPages/SendSuccessPage'
import SendFailPage from '../../components/failPages/FailPage'

import withForm from '../../components/HoC/withForm'
import { toNumber, toBigNumber } from '../../utils/math'

import PasswordModal from '../../components/PasswordModal'

import Asset from '../Asset'

import { logDeep } from '../../utils/debug'

import style from './Send.css'

export class Send extends Component {
  state = {
    loading: false,
    txid: '',
    assetType: '',
    address: '',
    amount: '',
    remark: '',
    showConfirmation: false,
    confirmationMessage: '',
    errorMessage: '',
  }

  resetState = () => {
    this.setState({
      loading: false,
      txid: '',
      assetType: 1,
      address: '',
      amount: '',
      remark: '',
      confirmationMessage: '',
      errorMessage: '',
    })
  }

  validateAddress = address => {
    if (!address) {
      return 'Address field is required'
    }

    try {
      if (wallet.isAddress(address) !== true || address.charAt(0) !== 'A') {
        return 'The address you entered was not valid.'
      }
    } catch (e) {
      return 'The address you entered was not valid.'
    }
  }

  validateAmount = (amount, assetType) => {
    if (!amount) {
      return 'Amount field is required'
    }

    try {
      if (toBigNumber(amount).lte(0)) {
        // check for negative/zero asset
        return 'You cannot send zero or negative amounts of an asset.'
      }
    } catch (e) {
      return 'You must enter a valid number.'
    }

    if (assetType === 'NEO' && !toBigNumber(amount).isInteger()) {
      // check for fractional NEO
      return 'You cannot send fractional amounts of NEO.'
    }
  }

  getHomeScreenBalance = network => {
    const { account, setBalance, networks } = this.props
    this.setState({ amountsError: '' }, () => {
      getBalance(networks, network, account)
        .then(results => setBalance(results.neo, results.gas))
        .catch(() => this.setState({ amountsError: 'Could not retrieve amount' }))
    })
  }

  getSelectedFieldValue = (option) => {
    this.setState({ selectedField: option.target.value })
  }

  getPortfolio = () => {
    const { account } = this.props
    let portfolio = {
      assets: [],
      tokens: [],
    }

    if (account && account.results && account.results._tokens.length) {
      portfolio.tokens = account.results._tokens

      portfolio.tokens.forEach(token => {
        portfolio.assets.push(<Asset assetName={ token.name } assetAmount={ token.amount.toLocaleString() } key={ token.name } />)
      })
    }
    return portfolio
  }

  getAmount = (symbol) => {
    const { account } = this.props
    const portfolio = this.getPortfolio()
    console.log(symbol)
    let amount = 0

    portfolio.tokens.forEach(token => {
      if (token.symbol === symbol) amount = token.amount
    })

    if (!amount) {
      if (symbol === 'GAS') amount = account.gas
      else if (symbol === 'NEO') amount = account.neo
    }

    return amount
  }

  handleCancelClick = () => {
    this.setState({ showConfirmation: false })
  }

  handleSubmit = (values, dispatch, formProps) => {
    const { assetType, address, amount, remark } = values
    const { setFormFieldError } = this.props

    this.setState({
      txid: '',
    })

    const addressErrorMessage = this.validateAddress(address)
    if (addressErrorMessage) {
      setFormFieldError('address', addressErrorMessage)
    }

    const amountErrorMessage = this.validateAmount(amount, assetType)
    if (amountErrorMessage) {
      setFormFieldError('amount', amountErrorMessage)
    }

    const validationPassed = (assetType === 'NEO' || assetType === 'GAS') && !amountErrorMessage && !addressErrorMessage

    if (validationPassed) {
      let confirmationMessage = 'Are you sure you want to send: ' + amount + ' ' + assetType + ' to ' + address + ' ?'
      this.setState({ assetType, address, amount, remark, showConfirmation: true, confirmationMessage })
    }
  }

  send = (wif) => {
    const { selectedNetworkId, account, reset, setFormFieldError } = this.props
    const { assetType, address, amount, remark } = this.state

    this.setState({ loading: true })
    console.log('wif:' + wif)
    let amounts = {}
    amounts[assetType] = toNumber(amount)
    sendAsset(selectedNetworkId, address, account, wif, amounts, remark, 0).then(result => {
      this.setState({
        loading: false,
        showConfirmation: false,
        txid: result,
      })
      console.log('result: ' + result)
      reset()
    }).catch(e => {
      console.log('send: ' + e.message)

      this.resetState()
      this.setState({
        loading: false,
        showConfirmation: false,
        errorMessage: e.message,
      })
      setFormFieldError('send', e.message)
    })
  }

  rejectSend = () => {
    const { reset } = this.props
    reset()
    this.setState({ showConfirmation: false })
  }

  render() {
    const { txid, loading, showConfirmation, confirmationMessage, errorMessage, selectedField } = this.state
    const {
      handleSubmit,
      account,
      accounts,
      history,
      selectedNetworkId,
      errors,
      clearFormFieldError,
      renderTextField,
    } = this.props

    let content

    const portfolio = this.getPortfolio()

    if (loading) {
      content = <Loader />
    } else if (showConfirmation) {
      let accountLabel

      if (Object.keys(accounts).length > 0) {
        Object.keys(accounts).forEach(index => {
          if (account.address === accounts[index].address) accountLabel = accounts[index].label
          logDeep('ac: ', accounts[index])
        })
      }

      content = (
        <PasswordModal
          confirmationMessage={ confirmationMessage }
          cancelSubmit={ this.handleCancelClick }
          accountLabel={ accountLabel }
          successHandler={ this.send }
          encryptedWif={ account.wif }
        />
        /*
        <SendConfirmCard
          address={ address }
          amount={ amount }
          assetType={ assetType }
          remark={ remark }
          successClickHandler={ this.send }
          rejectClickHandler={ this.rejectSend }
        />
        */
      )
    } else if (txid) {
      let successUrl

      if (selectedNetworkId === 'MainNet') successUrl = `https://neoscan.io/transaction/${txid}`
      else if (selectedNetworkId === 'TestNet') successUrl = `https://neoscan-testnet.io/transaction/${txid}`
      // TODO ELSE CUSTOM NET

      content = (
        <SendSuccessPage txid={ txid } title={ 'Transaction successful!' } onClickHandler={ () => history.push('/') } url={ successUrl } />
      )
    } else if (errorMessage) {
      console.log('errorMessage; ' + errorMessage)
      content = (
        <SendFailPage txid={ txid } title={ 'Transaction failed!' } onClickHandler={ () => history.push('/') } children={ errorMessage } />
      )
    } else {
      content = (
        <section className={ style.sendWrapper }>
          <section className={ style.sendContainer }>
            {errors.send ? (
              <ErrorCard onClickHandler={ () => clearFormFieldError('send') } message={ errors.send } />
            ) : null}
            <AccountInfo
              neo={ Number(account.neo) }
              gas={ Number(account.gas) }
              address={ account.address }
              getBalance={ () => this.getHomeScreenBalance(selectedNetworkId) }
              showOptions={ false }
              label={ getAccountName(account, accounts) }
            />
            <form onSubmit={ handleSubmit(this.handleSubmit) } className={ style.sendForm }>
              <section className={ style.sendSelectAsset }>
                <p className={ style.sendSelectAssetText }>Send</p>
                <Field
                  component='select'
                  className={ style.sendAssetSelectBox }
                  type='select'
                  name='assetType'
                  onChange={ e => this.getSelectedFieldValue(e) }
                >
                  <option value='NEO'>NEO</option>
                  <option value='GAS'>GAS</option>
                  { portfolio.tokens.map(token => (
                    <option key={ token.hash } value={ token.symbol }>
                      { token.name } { token.amount }
                    </option>
                  )) }
                </Field>
              </section>
              <section className={ style.sendAddress }>
                <Field
                  component={ renderTextField }
                  type='text'
                  placeholder='Address'
                  error={ errors.address }
                  name='address'
                  label='Recipient'
                />
              </section>
              <section className={ style.sendRemark }>
                <Field
                  component={ renderTextField }
                  type='text'
                  placeholder='Optional Remarks'
                  name='remark'
                  label='Remarks'
                />
              </section>
              <section className={ style.sendAmount }>
                <Field
                  component={ renderTextField }
                  type='text'
                  placeholder='Eg: 1'
                  error={ errors.amount }
                  name='amount'
                  label='Amount'
                  classNames={ style.sendAmountsInputField }
                />
                <section className={ style.sendAmount }>
                  Available: { this.getAmount(selectedField) }
                </section>
                <PrimaryButton buttonText='Send' icon={ sendSVG } classNames={ style.sendButton } />
              </section>
            </form>
          </section>
        </section>
      )
    }

    return <Fragment>{content}</Fragment>
  }
}

Send.propTypes = {
  account: PropTypes.object.isRequired,
  setBalance: PropTypes.func.isRequired,
  accounts: PropTypes.object.isRequired,
  selectedNetworkId: PropTypes.string.isRequired,
  networks: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setFormFieldError: PropTypes.func.isRequired,
  clearFormFieldError: PropTypes.func.isRequired,
  renderTextField: PropTypes.func.isRequired,
  history: PropTypes.object,
}

export default reduxForm({ form: 'send', destroyOnUnmount: false })(withForm(Send))
