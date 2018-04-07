import uuidv4 from 'uuid/v4'

import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  networks: {
    'MainNet': { name: 'MainNet', url: 'https://api.neoscan.io/api/main_net', canDelete: false, apiType: 'neoscan' },
    'TestNet': { name: 'TestNet', url: 'https://neoscan-testnet.io/api/test_net', canDelete: false, apiType: 'neoscan' },
    'CoZTestNet': { name: 'CoZ TestNet', url: 'https://coz.neoscan-testnet.io/api/main_net', canDelete: false, apiType: 'neoscan' },
  },
  selectedNetworkId: 'MainNet',
}

const actionsMap = {
  [ActionTypes.SWITCH_NETWORK] (state, action) {
    return {
      ...state,
      selectedNetworkId: action.id,
    }
  },
  [ActionTypes.ADD_CUSTOM_NETWORK] (state, action) {
    const networks = { ...state.networks }
    networks[uuidv4()] = { name: action.name, url: action.url, canDelete: true, apiType: action.apiType }

    return {
      ...state,
      networks,
    }
  },
  [ActionTypes.DELETE_CUSTOM_NETWORK] (state, action) {
    const networks = { ...state.networks }
    delete networks[action.id]

    return {
      ...state,
      networks,
    }
  },
}

export default function config(state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
