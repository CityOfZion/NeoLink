import * as types from '../constants/ActionTypes'

export function setAccount (wif) {
  return { type: types.SET_ACCOUNT, wif }
}
