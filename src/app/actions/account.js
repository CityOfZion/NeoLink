import * as types from '../constants/ActionTypes'

export function setAccount (wif, address) {
  return { type: types.SET_ACCOUNT, wif, address }
}
