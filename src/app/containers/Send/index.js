import { connect } from 'react-redux'

import Send from './Send'
import withLoginCheck from '../../components/Login/withLoginCheck'

import { setBalance } from '../../actions/account'

const mapStateToProps = (state: Object) => ({
  networks: state.config.networks,
  selectedNetworkId: state.config.selectedNetworkId,
  account: state.account,
  accounts: state.wallet.accounts,
})

const mapDispatchToProps = dispatch => ({
  setBalance,
})

export default withLoginCheck(connect(mapStateToProps, mapDispatchToProps)(Send))
