import uuidv4 from 'uuid/v4'

import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  networks: {
    'MainNet': { name: 'MainNet', url: 'http://api.wallet.cityofzion.io', canDelete: false, apiType: 'neondb' },
    'TestNet': { name: 'TestNet', url: 'http://testnet-api.wallet.cityofzion.io', canDelete: false, apiType: 'neondb' },
    'CoZTestNet': { name: 'CoZ TestNet', url: 'http://coz-privatenet.herokuapp.com/', canDelete: false, apiType: 'neondb' },
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
    networks[uuidv4()] = { name: action.name, url: action.url, canDelete: true, apiType: 'neondb' }

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
