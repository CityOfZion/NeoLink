import React, { Component } from 'react'
import { connect } from 'react-redux'

import Neon, { api } from '@cityofzion/neon-js'

@connect(
  state => ({
    network: state.network
  })
)

export default class TestInvoke extends Component {
  state = {
    errorMsg: '',
    loading: false
  }

  resetState = () => {
    this.setState({
      errorMsg: '',
      loading: false,
      result: ''
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { network } = this.props
    this.setState({
      loading: true,
      errorMsg: '',
      result: ''
    })

    if (!this.scriptHash || !this.scriptHash.value || !this.operation || !this.operation.value) {
      this.setState({
        loading: false,
        errorMsg: 'Error! Script hash and operation are both required!'
      })

      return
    }

    const txArgs = []
    if (this.arg1) {
      txArgs.push(this.arg1.value)
    }

    if (this.arg2) {
      txArgs.push(this.arg2.value)
    }

    const args = []
    txArgs.forEach((arg) => {
      if (arg !== '') args.push({'type': 7, 'value': arg})
    })

    const query = Neon.create.query({
      method: 'invokefunction',
      params: [this.scriptHash.value, this.operation.value, args]
    })
    api.neonDB.getRPCEndpoint(network.name)
      .then((endpoint) => {
        query.execute(endpoint)
          .then((response) => {
            this.setState({
              loading: false,
              result: response.result
            })
          })
      })
      .catch((e) => {
        this.setState({
          loading: false,
          errorMsg: 'Error testing invoke.'
        })
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
