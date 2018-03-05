import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addAccount } from '../../actions/wallet'

import CreateWallet from './CreateWallet'

const actionCreators = {
  addAccount,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(CreateWallet)
