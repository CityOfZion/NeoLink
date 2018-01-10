import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Neon from '@cityofzion/neon-js'

import { Button } from 'rmwc/Button'
import '@material/button/dist/mdc.button.min.css';

import Login from '../../components/Login'
import withLoginCheck from '../../components/Login/withLoginCheck';

import style from './Home.css'

import * as AccountActions from '../../actions/account'

@connect(
  state => ({
    account: state.account
  }),
  dispatch => ({
    actions: bindActionCreators(AccountActions, dispatch)
  })
)

class Home extends Component {
  handleClick = (e) => {
    const { actions } = this.props
    e.preventDefault()
    actions.setAccount('')
  }

  render() {
    const { account } = this.props
    const myAccount = Neon.create.account(account.wif)
    return (
      <div>
        <Button ripple raised onClick={this.handleClick}>
          Logout
        </Button>
        <div className={style.accountInfoContainer}>
          <div className={style.accountInfo}><span className={style.breakWord}>Address: {myAccount.address}</span></div>
          <div className={style.accountInfo} style={{ marginTop: '10px' }}><span className={style.breakWord}>Public key encoded: {myAccount.getPublicKey(true)}</span></div>
        </div>
      </div>
    )
  }
}

export default withLoginCheck(Home)
