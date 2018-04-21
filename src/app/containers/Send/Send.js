import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import Neon, { wallet } from '@cityofzion/neon-js'

import { getBalance, getAccountName } from '../../utils/helpers'

import AccountInfo from '../../components/AccountInfo'
import InputField from '../../components/common/form/InputField'
import SelectBox from '../../components/common/form/SelectBox'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'
import SendConfirmCard from '../../components/confirmPages/SendConfirmCard'
import sendSVG from '../../../img/paper-planeSolidWhite.svg'
import Loader from '../../components/Loader'
import ErrorCard from '../../components/errors/ErrorCard'
import SendSuccessPage from '../../components/successPages/SendSuccessPage'

import { toNumber, toBigNumber } from '../../utils/math'

import style from './Send.css'

export class Send extends Component {
  state = {
    errors: {
      address: '',
      amount: '',
      send: '',
    },
    loading: false,
    txid: '',
    assetType: '',
    address: '',
    amount: '',
    showConfirmation: false,
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

  _renderTextField = ({ input, ...rest }) => {
    return (
      <InputField
        { ...input }
        { ...rest }
        onChangeHandler={ event => {
          input.onChange(event.target.value)
          this._clearErrors(event.target.name)
        } }
      />
    )
  }

  _renderSelectField = ({ input, ...rest }) => (
    <SelectBox
      classNames={ style.sendAssetSelectBox }
      { ...input }
      { ...rest }
      onChangeHandler={ event => input.onChange(event.target.value) }
    />
  )

  resetState = () => {
    this.setState({
      loading: false,
      txid: '',
      assetType: 1,
      address: '',
      amount: '',
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

  handleSubmit = (values, dispatch, formProps) => {
    const { assetType, address, amount } = values

    this.setState({
      txid: '',
    })

    const addressErrorMessage = this.validateAddress(address)
    if (addressErrorMessage) {
      this._setErrorState('address', addressErrorMessage)
    }

    const amountErrorMessage = this.validateAmount(amount, assetType)
    if (amountErrorMessage) {
      this._setErrorState('amount', amountErrorMessage)
    }

    const validationPassed = (assetType === 'NEO' || assetType === 'GAS') && !amountErrorMessage && !addressErrorMessage

    if (validationPassed) {
      this.setState({ assetType, address, amount, showConfirmation: true })
    }
  }

  send = () => {
    const { selectedNetworkId, networks, account, reset } = this.props
    const { assetType, address, amount } = this.state

    this.setState({ loading: true })

    let amounts = {}
    amounts[assetType] = toNumber(amount)
    Neon.do
      .sendAsset(networks[selectedNetworkId].url, address, account.wif, amounts)
      .then(result => {
        console.log(result)
        this.setState({
          loading: false,
          txid: result.txid,
        })
        reset()
      })
      .catch(e => {
        reset()
        this.setState({
          loading: false,
          showConfirmation: false,
        })
        this._setErrorState('send', e.message)
      })
  }

  rejectSend = () => {
    const { reset } = this.props
    reset()
    this.setState({ showConfirmation: false })
  }

  render() {
    const { txid, loading, errors, showConfirmation, address, amount, assetType } = this.state
    const { handleSubmit, account, accounts, history, selectedNetworkId } = this.props

    let content

    if (loading) {
      content = <Loader />
    } else if (showConfirmation) {
      content = (
        <SendConfirmCard
          address={ address }
          amount={ amount }
          assetType={ assetType }
          succesClickHandler={ this.send }
          rejectClickHandler={ this.rejectSend }
        />
      )
    } else if (txid) {
      content = (
        <SendSuccessPage txid={ txid } title={ 'Transaction successful!' } onClickHandler={ () => history.push('/') } />
      )
    } else {
      content = (
        <section className={ style.sendWrapper }>
          <section className={ style.sendContainer }>
            {errors.send ? <ErrorCard onClickHandler={ () => this._clearErrors('send') } message={ errors.send } /> : null}
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
                  component={ this._renderSelectField }
                  cssOnly
                  name='assetType'
                  options={ [
                    {
                      label: 'NEO',
                      value: 'NEO',
                    },
                    {
                      label: 'GAS',
                      value: 'GAS',
                    },
                  ] }
                />
              </section>
              <section className={ style.sendAddress }>
                <Field
                  component={ this._renderTextField }
                  type='text'
                  placeholder='Address'
                  error={ errors.address }
                  name='address'
                  label='Recipient'
                />
              </section>
              <section className={ style.sendAmount }>
                <Field
                  component={ this._renderTextField }
                  type='text'
                  placeholder='Eg: 1'
                  error={ errors.amount }
                  name='amount'
                  label='Amount'
                  classNames={ style.sendAmountsInputField }
                />
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
  history: PropTypes.object,
}

export default reduxForm({ form: 'send', destroyOnUnmount: false, initialValues: { assetType: 'NEO' } })(Send)
