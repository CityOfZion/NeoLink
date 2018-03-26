import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import Neon, { wallet, api } from '@cityofzion/neon-js'
import withLoginCheck from '../../components/Login/withLoginCheck'

import style from './Home.css'
import neonPNG from '../../../img/icon-50.png'

import * as AccountActions from '../../actions/account'

@connect(
  state => ({
    account: state.account,
    accounts: state.wallet.accounts,
  }),
  dispatch => ({
    actions: bindActionCreators(AccountActions, dispatch),
  })
)
class Home extends Component {
  state = {
    amounts: {
      neo: '',
      gas: '',
    },
  }

  handleClick = e => {
    const { actions, history } = this.props

    e.preventDefault()
    actions.setAccount('', '')
    history.push('/')
  }

  componentDidMount() {
    Neon.get.balance('MainNet', 'AShpr7rnJ4VDksuakReTJ4cutTnAX6JN41').then(results => {
      const amounts = {
        neo: results.assets['NEO'].balance.c[0],
        gas: Number(results.assets['GAS'].balance.c.join('.')).toFixed(5),
      }

      this.setState({ amounts })
    })
  }

  getAccountName = () => {
    const { account, accounts } = this.props
    let result

    Object.keys(accounts).forEach(address => {
      if (address === account.address) {
        result = accounts[address].label
      }
    })
    return result
  }

  render() {
    const { account } = this.props
    const { neo, gas } = this.state.amounts
    const myAccount = Neon.create.account(account.wif)
    const accountName = this.getAccountName()

    return (
      <section className={ style.accountInfoContainer }>
        <div className={ style.accountInfo }>
          <div className={ style.accountInfoImageContainer }>
            <img src={ neonPNG } alt='Neo' />
          </div>
          <div className={ style.accountInfoDetails }>
            <h2 className={ style.accountInfoDetailsHeading }>{accountName}</h2>
            <p className={ style.accountInfoDetailsParagraph }>{myAccount.address}</p>
          </div>
          <button className={ style.accountActionsButton }>
            <i className='fa fa-ellipsis-v' />
          </button>
        </div>
        <div className={ style.accountInfoAmounts }>
          <div className={ style.accountInfoNeoAmount }>{neo}</div>
          <div className={ style.accountInfoGasAmount }>{gas}</div>
        </div>

        {/* // <button ripple raised onClick={ this.handleClick }>
        //   Logout
        // </button> */}
        {/* <div className={ style.accountInfoContainer }>
          <div className={ style.accountInfo }>
            <span className={ style.breakWord }>Address: {myAccount.address}</span>
          </div>
          <div className={ style.accountInfo } style={ { marginTop: '10px' } }>
            <span className={ style.breakWord }>Public key encoded: {myAccount.getPublicKey(true)}</span>
          </div>
        </div>  */}
      </section>
    )
  }
}

export default withLoginCheck(withRouter(Home))

Home.propTypes = {
  account: PropTypes.object,
  actions: PropTypes.object,
  history: PropTypes.object,
  accounts: PropTypes.object,
}
