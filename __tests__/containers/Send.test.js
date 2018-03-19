import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { api } from '@cityofzion/neon-js'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import SendForm, { Send } from '../../src/app/containers/Send/Send'
import testKeys from '../testKeys.json'

const setup = () => {
  const props = {
    selectedNetworkId: 'MainNet',
    networks: {
      MainNet: { name: 'MainNet', url: 'http://api.wallet.cityofzion.io', canDelete: false },
    },
    account: {
      wif: testKeys.t1.wif,
    },
  }

  const store = createStore(combineReducers({ form: formReducer }))
  const wrapper = mount(<Provider store={ store }><SendForm { ...props } /></Provider>)

  return {
    wrapper,
  }
}

describe('Send', () => {
  test('Amount passed to neon-js correctly', async (done) => {
    const { wrapper } = setup()

    wrapper.find('input[name="address"]').simulate('change', { target: { name: 'address', value: testKeys.t1.address } })
    wrapper.find('input[name="amount"]').simulate('change', { target: { name: 'amount', value: '2.00000001' } })
    wrapper.find('select').simulate('change', { target: { value: 'GAS' } })

    api.neonDB.doSendAsset = jest.fn((net, address, wif, amounts) => {
      return new Promise((resolve, reject) => {
        expect(amounts['GAS']).toEqual(2.00000001)
        done()
      })
    })

    wrapper.find('form').simulate('submit')
  })

  test('Address must be valid', async () => {
    const { wrapper } = setup()

    wrapper.find('input[name="address"]').simulate('change', { target: { name: 'address', value: 'fodfaoj' } })
    wrapper.find('input[name="amount"]').simulate('change', { target: { name: 'amount', value: '2' } })

    wrapper.find('form').simulate('submit')

    const sendState = wrapper.find(Send).instance().state
    expect(sendState.errorMsg).toEqual('The address you entered was not valid.')
  })

  test('Address must not be empty', async () => {
    const { wrapper } = setup()

    wrapper.find('input[name="address"]').simulate('change', { target: { name: 'address', value: '' } })
    wrapper.find('input[name="amount"]').simulate('change', { target: { name: 'amount', value: '2' } })

    wrapper.find('form').simulate('submit')

    const sendState = wrapper.find(Send).instance().state
    expect(sendState.errorMsg).toEqual('Address field is required')
  })

  test('Amount must not be empty', async () => {
    const { wrapper } = setup()

    wrapper.find('input[name="address"]').simulate('change', { target: { name: 'address', value: testKeys.t1.address } })
    wrapper.find('input[name="amount"]').simulate('change', { target: { name: 'amount', value: '' } })

    wrapper.find('form').simulate('submit')

    const sendState = wrapper.find(Send).instance().state
    expect(sendState.errorMsg).toEqual('Amount field is required')
  })

  test('Amount must be numeric', async () => {
    const { wrapper } = setup()

    wrapper.find('input[name="address"]').simulate('change', { target: { name: 'address', value: testKeys.t1.address } })
    wrapper.find('input[name="amount"]').simulate('change', { target: { name: 'amount', value: 'a' } })

    wrapper.find('form').simulate('submit')

    const sendState = wrapper.find(Send).instance().state
    expect(sendState.errorMsg).toEqual('You must enter a valid number.')
  })

  test('Amount must be positive', async () => {
    const { wrapper } = setup()

    wrapper.find('input[name="address"]').simulate('change', { target: { name: 'address', value: testKeys.t1.address } })
    wrapper.find('input[name="amount"]').simulate('change', { target: { name: 'amount', value: '-1' } })

    wrapper.find('form').simulate('submit')

    const sendState = wrapper.find(Send).instance().state
    expect(sendState.errorMsg).toEqual('You cannot send zero or negative amounts of an asset.')
  })

  test('Amount must be whole number if sending NEO', async () => {
    const { wrapper } = setup()

    wrapper.find('input[name="address"]').simulate('change', { target: { name: 'address', value: testKeys.t1.address } })
    wrapper.find('input[name="amount"]').simulate('change', { target: { name: 'amount', value: '1.01' } })
    wrapper.find('select').simulate('change', { target: { value: 'NEO' } })

    wrapper.find('form').simulate('submit')

    const sendState = wrapper.find(Send).instance().state
    expect(sendState.errorMsg).toEqual('You cannot send fractional amounts of NEO.')
  })

  test('Asset type must be valid', async () => {
    const { wrapper } = setup()

    wrapper.find('input[name="address"]').simulate('change', { target: { name: 'address', value: testKeys.t1.address } })
    wrapper.find('input[name="amount"]').simulate('change', { target: { name: 'amount', value: '1' } })
    wrapper.find('select').simulate('change', { target: { value: 'INVALID' } })

    wrapper.find('form').simulate('submit')

    const sendState = wrapper.find(Send).instance().state
    expect(sendState.errorMsg).toEqual('Asset Type invalid.')
  })
})
