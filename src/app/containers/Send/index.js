import React, { Component } from 'react'
import { connect } from 'react-redux'

import { api } from '@cityofzion/neon-js'

@connect(
  state => ({
    network: state.network,
    account: state.account
  })
)

export default class Send extends Component {
  state = {
    errorMsg: '',
    loading: false,
    txid: ''
  }

  resetState = () => {
    this.setState({
      errorMsg: '',
      loading: false,
      txid: ''
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { network, account } = this.props
    this.setState({
      loading: true,
      errorMsg: ''
    })

    if (!this.address || !this.address.value || !this.amount || !this.amount.value) {
      this.setState({
        loading: false,
        errorMsg: 'All fields are required'
      })

      return
    }

    var amounts = {}
    amounts[this.type.value] = parseFloat(this.amount.value)
    api.neonDB.doSendAsset(network.name, this.address.value, account.wif, amounts)
      .then((result) => {
        console.log(result)
        this.setState({
          loading: false,
          txid: result.txid
        })
      })
      .catch((e) => {
        console.log(e)
        this.setState({
          loading: false,
          errorMsg: 'Error sending'
        })
      })
  }

  render () {
    const { txid, loading, errorMsg } = this.state

    return (
      <div>
        <p>Invoke Contract</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Address'
            ref={(input) => { this.address = input }}
          />
          <input
            type='text'
            placeholder='Amount'
            ref={(input) => { this.amount = input }}
          />

          <label htmlFor='assetType'>Type:</label>
          <select
            id='assetType'
            ref={(input) => { this.type = input }}
          >
            <option value='NEO'>Neo</option>
            <option value='GAS' selected>Gas</option>
          </select>
          <button>Send</button>
        </form>

        { txid &&
          <div>
            <div>Success!</div>
            <div>txid: {txid}</div>
          </div>
        }
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
