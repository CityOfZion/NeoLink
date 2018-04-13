import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setAccount, setBalance, setTransactions } from '../../actions/account'

import Login from './Login'

const mapStateToProps = (state: Object) => ({
  account: state.account,
  accounts: state.wallet.accounts,
  selectedNetworkId: state.config.selectedNetworkId,
  networks: state.config.networks,
})

const actionCreators = {
  setAccount,
  setBalance,
  setTransactions,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
