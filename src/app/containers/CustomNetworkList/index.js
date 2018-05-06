import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { deleteCustomNetwork, setNetwork } from '../../actions/config'

import CustomNetworkList from './CustomNetworkList'

const mapStateToProps = state => ({
  selectedNetworkId: state.config.selectedNetworkId,
  networks: state.config.networks,
})

const actionCreators = {
  deleteCustomNetwork,
  setNetwork,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CustomNetworkList)
