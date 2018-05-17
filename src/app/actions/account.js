import * as types from '../constants/ActionTypes'

export function setAccount(wif, address) {
  return { type: types.SET_ACCOUNT, wif, address }
}

export function setBalance(neo, gas) {
  return { type: types.SET_BALANCE, neo, gas }
}

export function setTransactions(transactions) {
  return { type: types.SET_TRANSACTIONS, transactions }
}

export function logOut() {
  return { type: types.LOG_OUT }
}
