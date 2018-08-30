import * as ActionTypes from '../constants/ActionTypes'
import { logDeep } from '../utils/debug'

const initialState = {
  wif: '',
  address: '',
  neo: '',
  gas: '',
}

const actionsMap = {
  [ActionTypes.SET_ACCOUNT](state, action) {
    return {
      ...state,
      wif: action.wif,
      address: action.address,
    }
  },
  [ActionTypes.SET_BALANCE](state, action) {
    return {
      ...state,
      results: action.results,
      neo: action.results.neo,
      gas: action.results.gas,
    }
  },
  [ActionTypes.LOG_OUT](state, action) {
    return {
      ...state,
      wif: '',
      address: '',
      neo: '',
      gas: '',
    }
  },
  [ActionTypes.SET_TRANSACTIONS](state, action) {
    return {
      ...state,
      transactions: action.transactions,
    }
  },
}

export default function network(state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
