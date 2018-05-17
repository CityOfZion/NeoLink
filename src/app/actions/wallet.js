import * as types from '../constants/ActionTypes'

export function addAccount(account) {
  return { type: types.ADD_WALLET_ACCOUNT, account }
}

export function deleteAccount(address) {
  return { type: types.DELETE_WALLET_ACCOUNT, address }
}

export function changeLabel(account) {
  return { type: types.CHANGE_WALLET_LABEL, account }
}
