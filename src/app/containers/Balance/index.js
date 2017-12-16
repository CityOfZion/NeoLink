import React, { Component } from 'react'
import { connect } from 'react-redux'

import { api } from '@cityofzion/neon-js'

@connect(
  state => ({
    network: state.network
  })
)

export default class Balance extends Component {
  state = {
    errorMsg: '',
    loading: false,
    haveBalance: false,
    NEO: 0,
    GAS: 0
  }

  resetState = () => {
    this.setState({
      errorMsg: '',
      loading: false,
      haveBalance: false,
      NEO: 0,
      GAS: 0,
      address: ''
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { network } = this.props
    this.setState({
      loading: true,
      haveBalance: false,
      errorMsg: '',
      address: ''
    })
    api.neonDB.getBalance(network.name, this.balanceAddress.value)
      .then((result) => {
        this.setState({
          loading: false,
          haveBalance: true,
          NEO: result.NEO.balance,
          GAS: result.GAS.balance,
          address: this.balanceAddress.value
        })
      })
      .catch((e) => {
        this.setState({ loading: false, errorMessage: 'Could not retrieve the balance for this address.' })
      })
  }

  render () {
    const { haveBalance, errorMsg, loading, NEO, GAS, address } = this.state

    return (
      <div>
        <p >Balance</p>
        <form onSubmit={this.handleSubmit}>
          <input
            autoFocus
            type='text'
            placeholder='Address'
            ref={(input) => { this.balanceAddress = input }} />
          <button>Get Balance</button>
        </form>
        { haveBalance &&
          <div>
            <div>NEO: {NEO}</div>
            <div>GAS: {GAS}</div>
            <div>Address: {address}</div>
          </div>
        }
        { loading === true &&
          <div>loading...</div>
        }
        { errorMsg !== '' &&
          <div>ERROR: {errorMsg}</div>
        }
      </div>
    )
  }
}
