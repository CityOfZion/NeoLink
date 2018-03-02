import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  wif: '',
}

const actionsMap = {
  [ActionTypes.SET_ACCOUNT] (state, action) {
    return {
      ...state,
      wif: action.wif,
    }
  },
}

export default function network (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
