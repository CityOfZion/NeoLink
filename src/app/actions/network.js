import * as types from '../constants/ActionTypes'

export function switchNetwork (network) {
  return { type: types.SWITCH_NETWORK, network }
}
