import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { api, wallet } from '@cityofzion/neon-js'
import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import { Select } from 'rmwc/Select'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'
import '@material/select/dist/mdc.select.min.css'

import { toNumber, toBigNumber } from '../../utils/math'

class Send extends Component {
  state = {
    errorMsg: '',
    loading: false,
    txid: '',
    assetType: 'NEO',
    address: '',
    amount: '',
  }

  _handleTextFieldChange = (e) => {
    const key = e.target.id
    this.setState({
      [key]: e.target.value,
    })
  }

  resetState = () => {
    this.setState({
      errorMsg: '',
      loading: false,
      txid: '',
      assetType: 1,
      address: '',
      amount: '',
    })
  }

  validateAddress = (address) => {
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
      if (toBigNumber(amount).lte(0)) { // check for negative/zero asset
        return 'You cannot send zero or negative amounts of an asset.'
      }
    } catch (e) {
      return 'You must enter a valid number.'
    }

    if (assetType === 'NEO' && !toBigNumber(amount).isInteger()) { // check for fractional NEO
      return 'You cannot send fractional amounts of NEO.'
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { selectedNetworkId, networks, account } = this.props
    const { assetType, address, amount } = this.state
    this.setState({
      loading: true,
      errorMsg: '',
      txid: '',
    })

    const errorMessages = []
    const addressErrorMessage = this.validateAddress(address)
    if (addressErrorMessage) {
      errorMessages.push(addressErrorMessage)
    }

    const amountErrorMessage = this.validateAmount(amount, assetType)
    if (amountErrorMessage) {
      errorMessages.push(amountErrorMessage)
    }

    // Validate Asset Type
    if (assetType !== 'NEO' && assetType !== 'GAS') {
      errorMessages.push('Asset Type invalid.')
    }

    if (errorMessages.length > 0) {
      this.setState({
        loading: false,
        errorMsg: errorMessages.join(' '),
      })

      return
    }

    let amounts = {}
    amounts[assetType] = toNumber(amount)
    api.neonDB.doSendAsset(networks[selectedNetworkId].url, address, account.wif, amounts)
      .then((result) => {
        console.log(result)
        this.setState({
          loading: false,
          txid: result.txid,
        })
      })
      .catch((e) => {
        console.log(e)
        this.setState({
          loading: false,
          errorMsg: e.message,
        })
      })
  }

  render() {
    const { txid, loading, errorMsg } = this.state

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <TextField
            type='text'
            placeholder='Address'
            value={ this.state.address }
            id='address'
            onChange={ this._handleTextFieldChange }
          />
          <TextField
            type='text'
            placeholder='Amount'
            value={ this.state.amount }
            id='amount'
            onChange={ this._handleTextFieldChange }
          />

          <Select label='Asset'
            cssOnly
            value={ this.state.assetType }
            onChange={ (e) => {
              this.setState({
                assetType: e.target.value,
              })
            } }
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

          <Button raised ripple>Send</Button>
        </form>
        <br />
        {txid &&
          <div>
            <div>Success!</div>
            <div style={ { wordWrap: 'break-word', wordBreak: 'break-all' } }>
              <div>Transaction ID:</div>
              <div>{txid}</div>
            </div>
          </div>
        }
        {loading &&
          <div>Loading...</div>
        }
        {errorMsg !== '' &&
          <div>ERROR: {errorMsg}</div>
        }
      </div>
    )
  }
}

Send.propTypes = {
  account: PropTypes.object.isRequired,
  selectedNetworkId: PropTypes.string.isRequired,
  networks: PropTypes.object.isRequired,
}

export default Send
