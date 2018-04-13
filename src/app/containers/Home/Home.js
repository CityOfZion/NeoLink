import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { getAccountName, validateLength, getBalance, getTransactions } from '../../utils/helpers'

import AccountInfo from '../../components/AccountInfo'
import RenameAccount from '../../components/RenameAccount'
import TransactionList from '../../components/TransactionList'

import style from './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)

    const { account, accounts } = this.props

    this.state = {
      showInputField: false,
      label: getAccountName(account, accounts),
      transactionHistory: [],
      transactionHistoryError: '',
      showDropDown: false,
      labelError: '',
      amountsError: '',
    }
  }

  componentDidMount() {
    const { selectedNetworkId } = this.props

    this.getHomeScreenTransactions(selectedNetworkId)
    this.getHomeScreenBalance(selectedNetworkId)

    window.addEventListener('click', this._closeDropDownMenu)
  }

  comoponentWillUnmount() {
    window.removeEventListener('click', this._closeDropDownMenu)
  }

  componentWillReceiveProps(props, newProps) {
    this.getHomeScreenTransactions(props.selectedNetworkId)
  }

  getHomeScreenBalance = network => {
    const { account, accountActions, networks } = this.props
    this.setState({ amountsError: '' }, () => {
      getBalance(networks, network, account)
        .then(results => accountActions.setBalance(results.neo, results.gas))
        .catch(e => console.log(e))
    })
  }

  getHomeScreenTransactions = network => {
    const { account, networks } = this.props

    this.setState({ transactionHistoryError: '' }, () => {
      getTransactions(networks, network, account)
        .then(results => this.setState({ transactionHistory: results }))
        .catch(() =>
          this.setState({
            transactionHistoryError: 'Could not retrieve transactions.',
          })
        )
    })
  }

  toggleDropDownMenu = () => {
    this.setState(prevState => ({ showDropDown: !prevState.showDropDown }))
  }

  _closeDropDownMenu = event => {
    if (event.target && !event.target.className.includes('DropDown')) {
      this.setState({ showDropDown: false })
    }
  }

  handleRenameButtonFormSubmit = e => {
    e.preventDefault()
    const { walletActions, account } = this.props

    if (validateLength(this.state.label, 3)) {
      walletActions.changeLabel({ address: account.address, label: this.state.label })
      this.setState({ showInputField: false, showDropDown: false })
    } else {
      this.setState({ labelError: 'Label must be longer than 3 characters.' })
    }
  }

  handleInputChange = e => {
    this.setState({ labelError: '' })
    this.setState({ label: e.target.value })
  }

  showInputField = () => {
    this.setState({ showInputField: true })
  }

  render() {
    const { account, selectedNetworkId } = this.props
    const {
      showInputField,
      label,
      transactionHistory,
      amountsError,
      transactionHistoryError,
      labelError,
      showDropDown,
    } = this.state

    return (
      <Fragment>
        <section className={ style.accountInfoWrapper }>
          <section className={ style.accountInfoContainer }>
            {showInputField ? (
              <RenameAccount
                accountName={ label }
                onSubmitHandler={ this.handleRenameButtonFormSubmit }
                onChangeHandler={ this.handleInputChange }
                labelError={ labelError }
              />
            ) : (
              <AccountInfo
                onClickHandler={ this.showInputField }
                neo={ Number(account.neo) }
                gas={ Number(account.gas) }
                label={ label }
                address={ account.address }
                amountsError={ amountsError }
                getBalance={ this.getHomeScreenBalance }
                toggleDropDownMenu={ this.toggleDropDownMenu }
                showDropDown={ showDropDown }
                network={ selectedNetworkId }
                updateBalance={ this.getHomeScreenBalance }
              />
            )}
          </section>
        </section>
        <section className={ style.transactionInfo }>
          <h2 className={ style.transactionInfoHeader }>Transactions</h2>
          <TransactionList
            transactions={ transactionHistory }
            transactionHistoryError={ transactionHistoryError }
            getTransactions={ this.getHomeScreenTransactions }
          />
        </section>
      </Fragment>
    )
  }
}

export default Home

Home.propTypes = {
  walletActions: PropTypes.object.isRequired,
  networks: PropTypes.object,
  selectedNetworkId: PropTypes.string.isRequired,
  account: PropTypes.object.isRequired,
  accountActions: PropTypes.object,
  accounts: PropTypes.object.isRequired,
}
