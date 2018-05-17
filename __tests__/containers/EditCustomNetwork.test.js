import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { mount } from 'enzyme'

import EditCustomNetworkForm from '../../src/app/containers/EditCustomNetwork/EditCustomNetwork'

describe('Edit custom network', () => {
  const networks = {
    MainNet: { name: 'MainNet', url: 'http://api.wallet.cityofzion.io', canDelete: false },
    Local: { name: 'local', url: 'http://127.0.0.1:5000', canDelete: true, apiType: 'neoscan' },
  }

  test('Correctly calls editCustomNetwork when input is valid', () => {
    const store = createStore(combineReducers({ form: formReducer }))

    const editCustomNetwork = jest.fn()

    const wrapper = mount(
      <Provider store={ store }>
        <EditCustomNetworkForm
          editCustomNetwork={ editCustomNetwork }
          history={ {} }
          networks={ networks }
          match={ { params: { id: 'local' } } }
        />
      </Provider>
    )

    const name = wrapper.find('input[name="name"]')
    name.simulate('change', { target: { name: 'name', value: 'My custom network' } })

    const url = wrapper.find('input[name="url"]')
    url.simulate('change', { target: { name: 'url', value: 'http://mynetworkurl.com' } })

    wrapper.find('form').simulate('submit')

    expect(editCustomNetwork).toHaveBeenCalledWith('My custom network', 'http://mynetworkurl.com', 'neoscan', 'local')
  })
})
