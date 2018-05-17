import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { editCustomNetwork } from '../../actions/config'

import EditCustomNetwork from './EditCustomNetwork'

const actionCreators = {
  editCustomNetwork,
}

const mapStateToProps = state => ({ networks: state.config.networks })

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomNetwork)
