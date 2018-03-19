import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import { setNetwork } from '../../actions/config'

import Header from './Header'

const mapStateToProps = state => ({
  selectedNetworkId: state.config.selectedNetworkId,
  networks: state.config.networks,
  account: state.account,
})

const actionCreators = {
  setNetwork,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
