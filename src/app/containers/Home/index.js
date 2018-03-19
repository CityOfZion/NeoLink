import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import Neon from '@cityofzion/neon-js'

import { Button } from 'rmwc/Button'
import '@material/button/dist/mdc.button.min.css'

import withLoginCheck from '../../components/Login/withLoginCheck'

import style from './Home.css'

import * as AccountActions from '../../actions/account'

@connect(
  state => ({
    account: state.account,
  }),
  dispatch => ({
    actions: bindActionCreators(AccountActions, dispatch),
  })
)

class Home extends Component {
  handleClick = e => {
    const { actions, history } = this.props

    e.preventDefault()
    actions.setAccount('', '')
    history.push('/')
  }

  render() {
    const { account } = this.props
    const myAccount = Neon.create.account(account.wif)
    return (
      <div>
        <Button ripple raised onClick={ this.handleClick }>
          Logout
        </Button>
        <div className={ style.accountInfoContainer }>
          <div className={ style.accountInfo }>
            <span className={ style.breakWord }>Address: {myAccount.address}</span>
          </div>
          <div className={ style.accountInfo } style={ { marginTop: '10px' } }>
            <span className={ style.breakWord }>Public key encoded: {myAccount.getPublicKey(true)}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withLoginCheck(withRouter(Home))

Home.propTypes = {
  account: PropTypes.object,
  actions: PropTypes.object,
  history: PropTypes.object,
}
