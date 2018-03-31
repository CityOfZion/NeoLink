import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getAccountName } from '../../utils/helpers'

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
      transactionHistoryError: '',
      amounts: {
        neo: '',
        gas: '',
      },
      amountsError: '',
    }
  }

  componentDidMount() {
    this.getAccountInfo()
  }

  getAccountInfo = () => {
    const { selectedNetworkId, account } = this.props

    Neon.get
      .balance(selectedNetworkId, account.address)
      .then(results => {
        const amounts = {
          neo: Number(results.assets['NEO'].balance.c[0]),
          gas: Number(results.assets['GAS'].balance.c.join('.')).toFixed(5),
        }

        this.setState({ amounts })
      })
      .catch(() =>
        this.setState({ amountsError: 'Could not retrieve account balance. Please check your internet connection.' })
      )

    Neon.get
      .transactionHistory(selectedNetworkId, account.address)
      .then(results => this.setState({ transactionHistory: results }))
      .catch(() =>
        this.setState({
          transactionHistoryError: 'Could not retrieve transaction history. Please check your internet connection.',
        })
      )
  }

  handleRenameButtonFormSubmit = () => {
    const { walletActions, account } = this.props

    walletActions.changeLabel({ address: account.address, label: this.state.label })
    this.setState({ showInputField: false })
  }

  handleInputChange = e => {
    this.setState({ label: e.target.value })
  }

  render() {
    const { account } = this.props
    const { amounts, showInputField, label, transactionHistory } = this.state
    const { neo, gas } = amounts
    const myAccount = Neon.create.account(account.wif)

    return (
      <Home
        account={ account }
        amounts={ amounts }
        showInputField={ showInputField }
        label={ label }
        transactionHistory={ transactionHistory }
        neo={ neo }
        gas={ gas }
        myAccount={ myAccount }
        onClickHandler={ () => this.setState({ showInputField: true }) }
        onSubmitHandler={ this.handleRenameButtonFormSubmit }
        onChangeHandler={ this.handleInputChange }
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
