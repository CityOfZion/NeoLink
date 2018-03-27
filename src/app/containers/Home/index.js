import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { getAccountName } from '../../utils/helpers'

import Neon from '@cityofzion/neon-js'
import withLoginCheck from '../../components/Login/withLoginCheck'
import RenameAccount from './RenameAccount'

import style from './Home.css'
import neonPNG from '../../../img/icon-50.png'

import * as AccountActions from '../../actions/account'
import * as walletActions from '../../actions/wallet'

@connect(
  state => ({
    account: state.account,
    accounts: state.wallet.accounts,
  }),
  dispatch => ({
    actions: bindActionCreators(AccountActions, dispatch),
    walletActions: bindActionCreators(walletActions, dispatch),
  })
)
class Home extends Component {
  constructor(props) {
    super(props)

    const { account, accounts } = this.props

    this.state = {
      showInputField: false,
      label: getAccountName(account, accounts),
      amounts: {
        neo: '',
        gas: '',
      },
    }
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

  handleRenameButtonClick = () => {
    const { walletActions, account } = this.props

    walletActions.changeLabel({ address: account.address, label: this.state.label })
    this.setState({ showInputField: false })
  }

  handleInputChange = e => {
    this.setState({ label: e.target.value })
  }

  render() {
    const { account } = this.props
    const { amounts, showInputField, label } = this.state
    const { neo, gas } = amounts
    const myAccount = Neon.create.account(account.wif)

    const heading = (
      <Fragment>
        <div className={ style.accountInfoImageContainer }>
          <img src={ neonPNG } alt='Neo' />
        </div>
        <div className={ style.accountInfoDetails }>
          <h2 className={ style.accountInfoDetailsHeading }>
            {label}
            <button
              className={ style.accountInfoDetailsHeadingButton }
              onClick={ () => this.setState({ showInputField: true }) }
            >
              <i className='fas fa-pencil-alt' />
            </button>
          </h2>
          <p className={ style.accountInfoDetailsParagraph }>{myAccount.address}</p>
        </div>
        <button className={ style.accountActionsButton }>
          <i className='fa fa-ellipsis-v' />
        </button>
      </Fragment>
    )

    const inputField = (
      <RenameAccount
        accountName={ label }
        onClickHandler={ this.handleRenameButtonClick }
        onChangeHandler={ this.handleInputChange }
      />
    )

    const headingContent = showInputField ? inputField : heading
    return (
      <section className={ style.accountInfoContainer }>
        <div className={ style.accountInfo }>{headingContent}</div>
        {!showInputField && (
          <div className={ style.accountInfoAmounts }>
            <div className={ style.accountInfoNeoAmount }>
              <img src={ neonPNG } alt='Neo' className={ style.accountInfoNeoAmountImg } />
              <p className={ style.accountInfoAmountParagraph }>{neo} NEO</p>
            </div>
            <div className={ style.accountInfoGasAmount }>
              <i className='fas fa-tint' />
              <p className={ style.accountInfoAmountParagraph }>{gas} GAS</p>
            </div>
          </div>
        )}
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
