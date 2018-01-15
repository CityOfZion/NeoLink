import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { api } from '@cityofzion/neon-js'
import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'

@connect(
  state => ({
    config: state.config,
    network: state.network,
  })
)

export default class Transactions extends Component {
  state = {
    errorMsg: '',
    loading: false,
    transactions: [],
    address: '',
    enteredAddress: '',
  }

  _handleTextFieldChange = (e) => {
    const key = e.target.id
    this.setState({
      [key]: e.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { config, network } = this.props
    this.setState({
      loading: true,
      transactions: [],
      errorMsg: '',
      address: '',
    })
    api.neonDB.getTransactionHistory(config.networks[network.id].url, this.state.enteredAddress)
      .then((result) => {
        this.setState({
          loading: false,
          transactions: result,
          address: this.state.enteredAddress,
        })
      })
      .catch((e) => {
        this.setState({ loading: false, errorMsg: 'Could not retrieve the transactions for this address.' })
      })
  }

  renderTransactions(transactions) {
    const listItems = transactions.map((transaction) =>
      'Id: ' + transaction.txid +
        '\n NEO transferred: ' +
        transaction.NEO + '\n' +
        ' GAS transferred: ' +
        transaction.GAS + '\n\n'
    )
    return (
      // <ul style="overflow: hidden;">{listItems}</ul>
      <textarea
        readOnly
        style={ { border: 0, bottom: 0 } }
        rows='20'
        cols='40'
        name='transactionList'
        defaultValue={ listItems }
      />
    )
  }

  render() {
    const { transactions, address, errorMsg, loading } = this.state

    return (
      <div className='content'>
        <form onSubmit={ this.handleSubmit }>
          <TextField
            autoFocus
            type='text'
            placeholder='Address'
            value={ this.state.enteredAddress }
            id='enteredAddress'
            onChange={ this._handleTextFieldChange }
          />
          <Button raised ripple>List</Button>
        </form>
        {address && transactions.length > 0 &&
          (
            <div>
              <div>Results for: <br />{address}</div>
              <br />
              {this.renderTransactions(transactions)}
            </div>
          )
        }
        {address && !transactions.length &&
          (
            <div>
              <div>Results for: {address}</div>
              None
            </div>
          )
        }
        {loading === true &&
          <div>loading...</div>
        }
        {errorMsg !== '' &&
          <div>ERROR: {errorMsg}</div>
        }
      </div>
    )
  }
}

Transactions.propTypes = {
  config: PropTypes.object,
  network: PropTypes.object,
}
