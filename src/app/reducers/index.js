import { combineReducers } from 'redux'

import network from './network'
import account from './account'

export default combineReducers({
  account,
  network
})
