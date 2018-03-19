import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { api } from '@cityofzion/neon-js'
import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'

import { toBigNumber } from '../../utils/math'

@connect(
  state => ({
    selectedNetworkId: state.config.selectedNetworkId,
    networks: state.config.networks,
  })
)

export default class Balance extends Component {
  state = {
    errorMsg: '',
    loading: false,
    haveBalance: false,
    NEO: 0,
    GAS: 0,
    balanceAddress: '',
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
      haveBalance: false,
      NEO: 0,
      GAS: 0,
      address: '',
      balanceAddress: '',
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { networks, selectedNetworkId } = this.props
    this.setState({
      loading: true,
      haveBalance: false,
      errorMsg: '',
      address: '',
    })

    api.neonDB.getBalance(networks[selectedNetworkId]['url'], this.state.balanceAddress)
      .then((result) => {
        this.setState({
          loading: false,
          haveBalance: true,
          NEO: toBigNumber(result.assets.NEO.balance).toString(),
          GAS: toBigNumber(result.assets.GAS.balance).round(8).toString(),
          address: this.state.balanceAddress,
        })
      })
      .catch((e) => {
        this.setState({ loading: false, errorMsg: e.message })
      })
  }

  render() {
    const { haveBalance, errorMsg, loading, NEO, GAS, address } = this.state

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <TextField
            type='text'
            placeholder='Address'
            value={ this.state.balanceAddress }
            id='balanceAddress'
            onChange={ this._handleTextFieldChange }
          />
          <Button raised ripple>Get Balance</Button>
        </form>
        {haveBalance &&
          <div>
            <div>NEO: {NEO}</div>
            <div>GAS: {GAS}</div>
            <div>Address: {address}</div>
          </div>
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

Balance.propTypes = {
  selectedNetworkId: PropTypes.string,
  networks: PropTypes.object,
}
