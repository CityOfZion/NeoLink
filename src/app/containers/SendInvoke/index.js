import React, { Component } from 'react'
import { connect } from 'react-redux'

import Neon, { api } from '@cityofzion/neon-js'

@connect(
  state => ({
    network: state.network,
    account: state.account
  })
)

/*
  Test call ...
  {
    scriptHash: 'b3a14d99a3fb6646c78bf2f4e2f25a7964d2956a',
    operation: 'putvalue',
    arg1: 'test',
    arg2: '1',
    assetType: 'GAS',
    assetAmount: '.00025'
  }
*/

export default class SendInvoke extends Component {
  state = {
    errorMsg: '',
    loading: false
  }

  resetState = () => {
    this.setState({
      errorMsg: '',
      loading: false
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { network, account } = this.props
    this.setState({
      loading: true,
      errorMsg: ''
    })

    const txArgs = [this.arg1.value, this.arg2.value]
    const args = []
    txArgs.forEach((arg) => {
      if (arg !== '') args.push({'type': 7, 'value': arg})
    })

    // todo!
    this.setState({
      loading: false,
      errorMsg: 'Work in progress'
    })
  }

  render () {
    const { result, loading, errorMsg } = this.state

    return (
      <div>
        <p>Invoke Contract</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Operation'
            ref={(input) => { this.operation = input }}
          />
          <input
            type='text'
            placeholder='Argument 1'
            ref={(input) => { this.arg1 = input }}
          />
          <input
            type='text'
            placeholder='Argument 2'
            ref={(input) => { this.arg2 = input }}
          />
          <input
            type='text'
            placeholder='Script Hash'
            ref={(input) => { this.scriptHash = input }}
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
          <button>Invoke</button>
        </form>

        { result &&
          <div>
            result: { JSON.stringify(result) }
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
