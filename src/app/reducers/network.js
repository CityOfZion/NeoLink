import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  name: 'MainNet'
}

const actionsMap = {
  [ActionTypes.SWITCH_NETWORK] (state, action) {
    return {
      ...state,
      name: action.network
    }
  }
}

export default function network (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
