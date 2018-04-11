import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setAccount, setBalance } from '../../actions/account'

import Login from './Login'

const mapStateToProps = (state: Object) => ({
  account: state.account,
  accounts: state.wallet.accounts,
  selectedNetworkId: state.config.selectedNetworkId,
})

const actionCreators = {
  setAccount,
  setBalance,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
