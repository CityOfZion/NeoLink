import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ImportWallet from './ImportWallet'

import { addAccount } from '../../actions/wallet'

const actionCreators = {
  addAccount,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(ImportWallet)
