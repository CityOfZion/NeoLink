import * as ActionTypes from '../constants/ActionTypes'

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
    console.log(action)
    return {
      ...state,
      neo: action.neo,
      gas: action.gas,
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
}

export default function network(state = initialState, action) {
  console.log('reducing', action)
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
