import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import * as Neoscan from '../../utils/api/neoscan'

import SwitchAccountCard from '../../components/SwitchAccountCard'
import SwitchAccountConfirm from '../../components/SwitchAccountConfirm'

import style from './SwitchAccount.css'

class SwitchAccount extends Component {
  state = {
    accounts: [],
    showPasswordPrompt: false,
    password: '',
    encryptedKey: '',
  }

  componentDidMount() {
    this.setAccountState()
  }

  componentWillReceiveProps(nextProps) {
    const { selectedNetworkId } = this.props
    if (selectedNetworkId !== nextProps.selectedNetworkId) {
      this.setAccountState()
    }
  }

  setAccountState = () => {
    const { accounts } = this.props
    const formattedAccounts = []

    const accountsArray = Object.keys(accounts)
    accountsArray.map((account, index) => {
      Neoscan.getBalance(accounts[account].address).then(response => {
        formattedAccounts.push({
          address: accounts[account].address,
          encryptedKey: accounts[account].key,
          label: accounts[account].label,
          neo: response.neo,
          gas: response.gas,
        })
        if (index === accountsArray.length - 1) {
          setTimeout(() => this.setState({ accounts: formattedAccounts }), 0)
        }
      })
    })
  }

  generateAccountCards = () => {
    const { account } = this.props
    const { accounts } = this.state
    let selectedAccountIndex
    const accountCards = accounts.map(({ label, neo, gas, address, encryptedKey }, index) => {
      let selectedStyles = null
      if (account.address === address) {
        selectedStyles = style.accountSelected
        selectedAccountIndex = index
      }
      return (
        <SwitchAccountCard
          label={ label }
          neo={ neo }
          gas={ gas }
          address={ address }
          encryptedKey={ encryptedKey }
          classNames={ selectedStyles }
          onClickHandler={ () => this.handleSwitchAccountCardClick(encryptedKey) }
          key={ address }
        />
      )
    })
    const selectedAccount = accountCards.splice(selectedAccountIndex, 1)
    accountCards.unshift(selectedAccount)
    return accountCards
  }

  handleSwitchAccountCardClick = encryptedKey => {
    const { account } = this.props
    if (encryptedKey !== account.wif) {
      this.setState({ showPasswordPrompt: true, encryptedKey })
    }
  }

  handlePasswordSubmit = () => {}

  resetAccountInfo = () => this.setState({ encryptedKey: '', showPasswordPrompt: false })

  render() {
    const { showPasswordPrompt, password } = this.state
    return (
      <Fragment>
        {!showPasswordPrompt && (
          <section className={ style.switchAccountContainer }>
            <h1 className={ style.switchAccountHeading }>Switch Account</h1>
            {this.generateAccountCards()}
          </section>
        )}
        {showPasswordPrompt && (
          <SwitchAccountConfirm
            onClickHandler={ this.resetAccountInfo }
            onSubmitHandler={ this.handlePasswordSubmit }
            value={ password }
          />
        )}
      </Fragment>
    )
  }
}

SwitchAccount.propTypes = {
  accounts: PropTypes.object,
  account: PropTypes.object,
  selectedNetworkId: PropTypes.object,
}

export default SwitchAccount