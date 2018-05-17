import * as types from '../constants/ActionTypes'

export function addCustomNetwork(name, url, apiType) {
  return { type: types.ADD_CUSTOM_NETWORK, name, url, apiType }
}

export function editCustomNetwork(name, url, apiType, id) {
  return { type: types.EDIT_CUSTOM_NETWORK, name, url, apiType, id }
}

export function deleteCustomNetwork(id) {
  return { type: types.DELETE_CUSTOM_NETWORK, id }
}

export function setNetwork(id) {
  return { type: types.SWITCH_NETWORK, id }
}
