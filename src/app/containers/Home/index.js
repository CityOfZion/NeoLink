import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getAccountName, validateLength } from '../../utils/helpers'

import Neon from '@cityofzion/neon-js'
import withLoginCheck from '../../components/Login/withLoginCheck'

import Home from './Home'

import * as AccountActions from '../../actions/account'
import * as walletActions from '../../actions/wallet'

@connect(
  state => ({
    account: state.account,
    accounts: state.wallet.accounts,
    selectedNetworkId: state.config.selectedNetworkId,
  }),
  dispatch => ({
    actions: bindActionCreators(AccountActions, dispatch),
    walletActions: bindActionCreators(walletActions, dispatch),
  })
)
class HomeContainer extends Component {
  constructor(props) {
    super(props)

    const { account, accounts } = this.props

    this.state = {
      showInputField: false,
      label: getAccountName(account, accounts),
      transactionHistory: [],
      transactionHistoryError: false,
      labelError: '',
      amounts: {
        neo: '',
        gas: '',
      },
      amountsError: false,
    }
  }

  componentDidMount() {
    this.getAccountInfo()
  }

  getBalance = () => {
    const { selectedNetworkId, account } = this.props

    this.setState({ amountsError: false }, () => {
      Neon.get
        .balance(selectedNetworkId, account.address)
        .then(results => {
          const amounts = {
            neo: Number(results.assets['NEO'].balance.c[0]),
            gas: Number(results.assets['GAS'].balance.c.join('.')).toFixed(5),
          }

          this.setState({ amounts })
        })
        .catch(() => this.setState({ amountsError: true }))
    })
  }

  getTransactions = () => {
    const { selectedNetworkId, account } = this.props

    this.setState({ transactionHistoryError: false }, () => {
      Neon.get
        .transactionHistory(selectedNetworkId, account.address)
        .then(results => this.setState({ transactionHistory: results }))
        .catch(() =>
          this.setState({
            transactionHistoryError: true,
          })
        )
    })
  }

  getAccountInfo = () => {
    this.getBalance()
    this.getTransactions()
  }

  handleRenameButtonFormSubmit = e => {
    e.preventDefault()
    const { walletActions, account } = this.props

    if (validateLength(this.state.label, 3)) {
      walletActions.changeLabel({ address: account.address, label: this.state.label })
      this.setState({ showInputField: false })
    } else {
      this.setState({ labelError: 'Label must be longer than 3 characters.' })
    }
  }

  handleInputChange = e => {
    this.setState({ labelError: '' })
    this.setState({ label: e.target.value })
  }

  render() {
    const { account } = this.props
    const {
      amounts,
      showInputField,
      label,
      transactionHistory,
      amountsError,
      transactionHistoryError,
      labelError,
    } = this.state
    const { neo, gas } = amounts

    return (
      <Home
        account={ account }
        amounts={ amounts }
        showInputField={ showInputField }
        label={ label }
        transactionHistory={ transactionHistory }
        neo={ neo }
        gas={ gas }
        address={ account.address }
        onClickHandler={ () => this.setState({ showInputField: true }) }
        onSubmitHandler={ this.handleRenameButtonFormSubmit }
        onChangeHandler={ this.handleInputChange }
        amountsError={ amountsError }
        transactionHistoryError={ transactionHistoryError }
        getTransactions={ this.getTransactions }
        getBalance={ this.getBalance }
        labelError={ labelError }
      />
    )
  }
}

HomeContainer.propTypes = {
  account: PropTypes.object,
  accounts: PropTypes.object,
  walletActions: PropTypes.object,
  selectedNetworkId: PropTypes.string.isRequired,
}

export default withLoginCheck(withRouter(HomeContainer))
