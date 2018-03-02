import { combineReducers } from 'redux'

import account from './account'
import config from './config'

export default combineReducers({
  account,
  config,
})
