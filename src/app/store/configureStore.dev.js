import { applyMiddleware, createStore, compose } from 'redux'
import { persistState } from 'redux-devtools'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import storage from '../utils/storage'
import DevTools from '../containers/DevTools'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

export const history = createHistory()

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
  })
  : compose
/* eslint-enable no-underscore-dangle */

const enhancer = composeEnhancers(
  applyMiddleware(...[thunk, routerMiddleware(history)]),
  storage(),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
)

function getDebugSessionKey() {
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
  return matches && matches.length > 0 ? matches[1] : null
}

export default function(initialState) {
  if (initialState.router && initialState.router.location) {
    history.location = initialState.router.location
  }
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
