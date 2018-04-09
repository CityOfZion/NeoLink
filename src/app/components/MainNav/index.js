import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setAccount } from '../../actions/account'

import MainNav from './MainNav'

const actionCreators = {
  setAccount,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(MainNav)
