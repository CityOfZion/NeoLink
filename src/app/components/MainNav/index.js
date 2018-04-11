import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logOut } from '../../actions/account'

import MainNav from './MainNav'

const actionCreators = {
  logOut,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(MainNav)
