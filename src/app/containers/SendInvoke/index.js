import React, { Component } from 'react'
import { connect } from 'react-redux'

import Neon, { api } from '@cityofzion/neon-js'

import style from './SendInvoke.css'

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
      loading: false,
      txid: ''
    })
  }

  String2Hex (tmp) {
    var str = ''
    for (var i = 0; i < tmp.length; i++) {
      str += tmp[i].charCodeAt(0).toString(16)
    }
    return str
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { network, account } = this.props
    this.setState({
      loading: true,
      errorMsg: '',
      txid: ''
    })

    if (!this.scriptHash || !this.scriptHash.value || !this.operation || !this.operation.value || !this.amount || !this.amount.value) {
      this.setState({
        loading: false,
        errorMsg: 'Error! Script hash, operation and amount are all required!'
      })

      return
    }

    const txArgs = [this.arg1.value, this.arg2.value]
    const args = []
    txArgs.forEach((arg) => {
      if (arg !== '') args.push(this.String2Hex(arg))
    })

    const myAccount = Neon.create.account(account.wif)

    const config = {
      net: network.name,
      privateKey: myAccount.privateKey,
      address: myAccount.address,
      intents: [{ assetId: Neon.CONST.ASSET_ID[this.type.value], value: parseFloat(this.amount.value), scriptHash: this.scriptHash.value }],
      script: { scriptHash: this.scriptHash.value, operation: this.operation.value, args: args },
      gas: 0
    }

    return api.doInvoke(config)
      .then((c) => {
        if (c.response.result === true) {
          this.setState({
            loading: false,
            txid: c.response.txid
          })
        } else {
          this.setState({
            loading: false,
            errorMsg: 'Invoke failed'
          })
        }
      })
      .catch((e) => {
        console.log('e', e)
        this.setState({
          loading: false,
          errorMsg: 'Invoke failed'
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
            autoFocus
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
          <button disabled={loading}>Invoke</button>
        </form>

        { txid &&
          <div>
            Success! txid: <span className={style.transactionId}>{ txid }</span>
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
