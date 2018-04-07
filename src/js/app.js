import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../app/Root'
import '../../vendor/fontawesome-all.min'

chrome.storage.local.get('stateVersion', stateVersion => {
  chrome.storage.local.get('state', obj => {
    const { state } = obj

    let initialState = JSON.parse(state || '{}')

    if (stateVersion < 1) {
      initialState = upgradeToStateVersion1(initialState)
      stateVersion = 1
    }

    const createStore = require('../app/store/configureStore').default

    const container = document.querySelector('#container')
    const isPopupWindow = container.classList.contains('popup')

    ReactDOM.render(<Root store={ createStore(initialState) } isPopupWindow={ isPopupWindow } />, container)
  })
})

// Moving defaults from neondb to neoscan.
function upgradeToStateVersion1(initialState) {
  if (initialState && initialState.config && initialState.config.networks) {
    Object.keys(initialState.config.networks).forEach(function (key) {
      if (initialState.config.networks[key].apiType === 'neonDB') {
        initialState.config.networks[key].apiType = 'neondb'
      }
      if (initialState.config.networks[key].apiType === 'neondb') {
        if (key === 'MainNet') {
          initialState.config.networks[key].apiType = 'neoscan'
          initialState.config.networks[key].url = 'https://api.neoscan.io/api/main_net'
        } else if (key === 'TestNet') {
          initialState.config.networks[key].apiType = 'neoscan'
          initialState.config.networks[key].url = 'https://neoscan-testnet.io/api/test_net'
        } else if (key === 'CoZTestNet') {
          initialState.config.networks[key].apiType = 'neoscan'
          initialState.config.networks[key].url = 'https://coz.neoscan-testnet.io/api/main_net'
        } else {
          initialState.config.networks[key].apiType = 'neonDB'
        }
      }
    })
  }

  return initialState
}
