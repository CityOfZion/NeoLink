import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setAccount } from '../../actions/account'

import Login from './Login'

const mapStateToProps = (state: Object) => ({
  account: state.account,
  accounts: state.wallet.accounts,
})

const actionCreators = {
  setAccount,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
