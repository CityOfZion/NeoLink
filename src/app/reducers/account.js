import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  wif: '',
  address: '',
}

const actionsMap = {
  [ActionTypes.SET_ACCOUNT] (state, action) {
    return {
      ...state,
      wif: action.wif,
      address: action.address,
    }
  },
}

export default function network (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
