import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import { Select } from 'rmwc/Select'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'
import '@material/select/dist/mdc.select.min.css'

import { callInvoke } from '../../utils/neonWrappers'

import style from './SendInvoke.css'
import withLoginCheck from '../../components/Login/withLoginCheck'

@connect(
  state => ({
    networks: state.config.networks,
    selectedNetworkId: state.config.selectedNetworkId,
    account: state.account,
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

class SendInvoke extends Component {
  state = {
    loading: false,
    errorMsg: '',
    txid: '',
    args: [],
  }

  handleAddArg = () => {
    this.setState({
      args: this.state.args.concat([{ 'value': '' }]),
    })
  }

  handleRemoveArg = (idx) => () => {
    this.setState({
      args: this.state.args.filter((s, sidx) => idx !== sidx),
    })
  }

  handleArgChange = (idx) => (evt) => {
    const newArgs = this.state.args.map((arg, sidx) => {
      if (idx !== sidx) return arg
      return { ...arg, value: evt.target.value }
    })

    this.setState({ args: newArgs })
  }

  _handleTextFieldChange = (e) => {
    const key = e.target.id
    this.setState({
      [key]: e.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { selectedNetworkId, networks, account } = this.props

    this.setState({
      loading: true,
      errorMsg: '',
      txid: '',
    })

    // DEBUGZ
    // this.state.args.forEach(arg => {
    //   console.log('args: '+arg.value)
    // })

    if (!this.state.scriptHash || !this.state.operation || !this.state.amount) {
      this.setState({
        loading: false,
        errorMsg: 'Error! Script hash, operation and amount are all required!',
      })

      return
    }

    callInvoke(networks[selectedNetworkId].url, account, this.state)
      .then((c) => {
        if (c.response.result === true) {
          this.setState({
            loading: false,
            txid: c.response.txid,
          })
        } else {
          this.setState({
            loading: false,
            errorMsg: 'Invoke failed',
          })
        }
      })
      .catch((e) => {
        console.log('e', e)
        this.setState({
          loading: false,
          errorMsg: 'Invoke failed',
        })
      })
  }

  render() {
    const { loading, txid, errorMsg } = this.state

    return (
      <div>
        <form onSubmit={ this.handleSubmit } style={ { paddingTop: '35px' } }>
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
          {this.state.args.map((arg, idx) => (
            <div className='arg'>
              <input
                type='text'
                placeholder={ `arg #${idx + 1} value` }
                value={ arg.value }
                onChange={ this.handleArgChange(idx) }
              />
              <button type='button' onClick={ this.handleRemoveArg(idx) } className='small'>-</button>
            </div>
          ))}
          <button type='button' onClick={ this.handleAddArg } className='small'>Add Arg</button>
          <TextField
            type='text'
            placeholder='Amount'
            value={ this.state.amount }
            id='amount'
            onChange={ this._handleTextFieldChange }
          />
          <Select cssOnly label='Asset'
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
          <Button raised ripple disabled={ this.state.loading }>Invoke</Button>
        </form>

        { txid &&
          <div className={ style.statusBox }>
            Success! txid: <span className={ style.transactionId }>{ txid }</span>
          </div>
        }
        { loading &&
          <div className={ style.statusBox }>Loading...</div>
        }
        { errorMsg !== '' &&
          <div className={ style.statusBox }>ERROR: {errorMsg}</div>
        }
      </div>
    )
  }
}

export default withLoginCheck(SendInvoke)

SendInvoke.propTypes = {
  account: PropTypes.object,
  networks: PropTypes.object,
  selectedNetworkId: PropTypes.string,
}
