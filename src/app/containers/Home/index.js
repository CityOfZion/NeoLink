import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import withLoginCheck from '../../components/Login/withLoginCheck'

import * as accountActions from '../../actions/account'
import * as walletActions from '../../actions/wallet'

import Home from './Home'

const mapStateToProps = state => ({
  account: state.account,
  accounts: state.wallet.accounts,
  selectedNetworkId: state.config.selectedNetworkId,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(accountActions, dispatch),
  walletActions: bindActionCreators(walletActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(withLoginCheck(withRouter(Home)))
