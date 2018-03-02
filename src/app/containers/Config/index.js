import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addCustomNetwork, setNetwork, deleteCustomNetwork } from '../../actions/config'

import Config from './Config'

const mapStateToProps = (state: Object) => ({
  selectedNetworkId: state.config.selectedNetworkId,
  networks: state.config.networks,
})

const actionCreators = {
  addCustomNetwork,
  deleteCustomNetwork,
  setNetwork,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Config)
