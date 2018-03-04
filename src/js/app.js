import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../app/Root'

chrome.storage.local.get('state', obj => {
  const { state } = obj

  const initialState = JSON.parse(state || '{}')
  const createStore = require('../app/store/configureStore').default

  const container = document.querySelector('#container')
  const isPopupWindow = container.classList.contains('popup')

  ReactDOM.render(<Root store={ createStore(initialState) } isPopupWindow={ isPopupWindow } />, container)
})
