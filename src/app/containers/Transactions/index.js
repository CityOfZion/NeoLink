import React, { Component } from 'react'
import { connect } from 'react-redux'

import { api } from '@cityofzion/neon-js'

import style from './Transactions.css'

@connect(
  state => ({
    network: state.network
  })
)

export default class Transactions extends Component {
  state = {
    errorMsg: '',
    loading: false,
    transactions: [],
    address: ''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { network } = this.props
    this.setState({
      loading: true,
      transactions: [],
      errorMsg: '',
      address: ''
    })
    api.neonDB.getTransactionHistory(network.name, this.enteredAddress.value)
      .then((result) => {
        this.setState({
          loading: false,
          transactions: result,
          address: this.enteredAddress.value
        })
      })
      .catch((e) => {
        this.setState({ loading: false, errorMessage: 'Could not retrieve the transactions for this address.' })
      })
  }

  renderTransactions (transactions) {
    const listItems = transactions.map((transaction) =>
      <li>
        <div className={style.transactionId}>{transaction.txid}</div>
        <div>NEO transferred: {transaction.NEO}</div>
        <div>GAS transferred: {transaction.GAS}</div>
      </li>
    )
    return (
      <ul>{listItems}</ul>
    )
  }

  render () {
    const { transactions, address, errorMsg, loading } = this.state

    return (
      <div className='content'>
        <p>Transactions</p>
        <form onSubmit={this.handleSubmit}>
          <input
            autoFocus
            type='text'
            placeholder='Address'
            ref={(input) => { this.enteredAddress = input }} />
          <button>List</button>
        </form>
        { address && transactions.length > 0 &&
          (
            <div>
              <div>Results for: {address}</div>
              {this.renderTransactions(transactions)}
            </div>
          )
        }
        { address && !transactions.length &&
          (
            <div>
              <div>Results for: {address}</div>
              None
            </div>
          )
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
