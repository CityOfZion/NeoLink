import * as types from '../constants/ActionTypes'

export function addCustomNetwork (name, url) {
  return { type: types.ADD_CUSTOM_NETWORK, name, url }
}

export function deleteCustomNetwork (id) {
  return { type: types.DELETE_CUSTOM_NETWORK, id }
}

export function setNetwork (id) {
  return { type: types.SWITCH_NETWORK, id }
}
