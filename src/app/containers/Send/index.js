import { connect } from 'react-redux'

import Send from './Send'
import withLoginCheck from '../../components/Login/withLoginCheck'

const mapStateToProps = (state: Object) => ({
  networks: state.config.networks,
  selectedNetworkId: state.config.selectedNetworkId,
  account: state.account,
})

export default withLoginCheck(connect(mapStateToProps)(Send))
