import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Neon, { api } from '@cityofzion/neon-js'

import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'

@connect(
  state => ({
    selectedNetworkId: state.config.selectedNetworkId,
    networks: state.config.networks,
  })
)

export default class TestInvoke extends Component {
  state = {
    errorMsg: '',
    loading: false,
    scriptHash: '',
    arg1: '',
    arg2: '',
    operation: '',
  }

  resetState = () => {
    this.setState({
      errorMsg: '',
      loading: false,
      scriptHash: '',
      arg1: '',
      arg2: '',
      operation: '',
    })
  }

  _handleTextFieldChange = (e) => {
    const key = e.target.id
    this.setState({
      [key]: e.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { selectedNetworkId, networks } = this.props
    this.setState({
      loading: true,
      errorMsg: '',
      result: '',
    })

    if (!this.state.scriptHash || !this.state.operation) {
      this.setState({
        loading: false,
        errorMsg: 'Error! Script hash and operation are both required!',
      })

      return
    }

    const txArgs = []
    if (this.state.arg1) {
      txArgs.push(this.state.arg1)
    }

    if (this.state.arg2) {
      txArgs.push(this.state.arg2)
    }

    const args = []
    txArgs.forEach((arg) => {
      if (arg !== '') args.push({ 'type': 7, 'value': arg })
    })

    args.push({ 'type': 7, 'value': 'arg' })

    const query = Neon.create.query({
      method: 'invokefunction',
      params: [this.state.scriptHash, this.state.operation, args],
    })

    api.neonDB.getRPCEndpoint(networks[selectedNetworkId].url)
      .then((endpoint) => {
        query.execute(endpoint)
          .then((response) => {
            this.setState({
              loading: false,
              result: response.result,
            })
          })
      })
      .catch((e) => {
        this.setState({
          loading: false,
          errorMsg: 'Error testing invoke.',
        })
      })
  }

  render() {
    const { result, loading, errorMsg } = this.state
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <TextField
            type='text'
            placeholder='Script Hash'
            value={ this.state.scriptHash }
            id='scriptHash'
            onChange={ this._handleTextFieldChange }
          />
          <TextField
            type='text'
            placeholder='Operation'
            value={ this.state.operation }
            id='operation'
            onChange={ this._handleTextFieldChange }
          />
          <TextField
            type='text'
            placeholder='Argument 1'
            value={ this.state.arg1 }
            id='arg1'
            onChange={ this._handleTextFieldChange }
          />
          <TextField
            type='text'
            placeholder='Argument 2'
            value={ this.state.arg2 }
            id='arg2'
            onChange={ this._handleTextFieldChange }
          />
          <Button raised ripple>Invoke</Button>
        </form>
        {result &&
          <div>
            <div>result:</div>
            <pre>
              {JSON.stringify(result, null, 2)}
            </pre>
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

TestInvoke.propTypes = {
  selectedNetworkId: PropTypes.string,
  networks: PropTypes.object,
}
