import React from 'react'
import { Provider } from 'react-redux'
import MockStore from '../../__mocks__/MockStore'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { mount } from 'enzyme'

import AddCustomNetworkForm, { AddCustomNetwork } from '../../src/app/containers/AddCustomNetwork/AddCustomNetwork'

describe('AddCustomNetwork', () => {
  const networks = {
    MainNet: { name: 'MainNet', url: 'http://api.wallet.cityofzion.io', canDelete: false },
    Local: { name: 'local', url: 'http://127.0.0.1:5000', canDelete: true },
  }

  test('Correctly displays errors', () => {
    const store = new MockStore()

    const wrapper = mount(
      <Provider store={ store }>
        <AddCustomNetworkForm addCustomNetwork={ jest.fn() } history={ {} } networks={ networks } />
      </Provider>
    )

    wrapper.find('form').simulate('submit')

    const addCustomNetworkState = wrapper.find(AddCustomNetwork).instance().state

    expect(addCustomNetworkState.errors.name).toEqual('Name must be longer than 3 characters')
    expect(addCustomNetworkState.errors.url).toEqual('Url must be longer than 3 characters')
  })

  test('Correctly calls addCustomNetwork when input is valid', () => {
    const store = createStore(combineReducers({ form: formReducer }))

    const addCustomNetwork = jest.fn()

    const wrapper = mount(
      <Provider store={ store }>
        <AddCustomNetworkForm addCustomNetwork={ addCustomNetwork } history={ {} } networks={ networks } />
      </Provider>
    )

    const name = wrapper.find('input[name="name"]')
    name.simulate('change', { target: { name: 'name', value: 'My custom network' } })

    const url = wrapper.find('input[name="url"]')
    url.simulate('change', { target: { name: 'url', value: 'http://mynetworkurl.com' } })

    wrapper.find('form').simulate('submit')

    expect(addCustomNetwork).toHaveBeenCalledWith('My custom network', 'http://mynetworkurl.com', 'neoscan')
  })
})
