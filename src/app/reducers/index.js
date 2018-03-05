import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import account from './account'
import wallet from './wallet'
import config from './config'

export default combineReducers({
  account,
  config,
  wallet,
  form: formReducer,
  router: routerReducer,
})
