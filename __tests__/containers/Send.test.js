import React from 'react'
import { mount } from 'enzyme'
import { api } from '@cityofzion/neon-js'

import Send from '../../src/app/containers/Send/Send'
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
  const wrapper = mount(<Send { ...props } />)

  return {
    wrapper,
  }
}

describe('Send', () => {
  test('Amount passed to neon-js correctly', async (done) => {
    const { wrapper } = setup()

    wrapper.setState({
      amount: '2.00000001',
      address: testKeys.t1.address,
      assetType: 'GAS',
    })

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

    wrapper.setState({
      amount: '2',
      address: 'fodfaoj',
    })

    wrapper.find('form').simulate('submit')
    expect(wrapper.state('errorMsg')).toEqual('The address you entered was not valid.')
  })

  test('Address must not be empty', async () => {
    const { wrapper } = setup()

    wrapper.setState({
      amount: '2',
      address: '',
    })

    wrapper.find('form').simulate('submit')
    expect(wrapper.state('errorMsg')).toEqual('Address field is required')
  })

  test('Amount must not be empty', async () => {
    const { wrapper } = setup()

    wrapper.setState({
      amount: '',
      address: testKeys.t1.address,
    })

    wrapper.find('form').simulate('submit')
    expect(wrapper.state('errorMsg')).toEqual('Amount field is required')
  })

  test('Amount must be numeric', async () => {
    const { wrapper } = setup()

    wrapper.setState({
      amount: 'a',
      address: testKeys.t1.address,
    })

    wrapper.find('form').simulate('submit')
    expect(wrapper.state('errorMsg')).toEqual('You must enter a valid number.')
  })

  test('Amount must be positive', async () => {
    const { wrapper } = setup()

    wrapper.setState({
      amount: '-1',
      address: testKeys.t1.address,
    })

    wrapper.find('form').simulate('submit')
    expect(wrapper.state('errorMsg')).toEqual('You cannot send zero or negative amounts of an asset.')
  })

  test('Amount must be whole number if sending NEO', async () => {
    const { wrapper } = setup()

    wrapper.setState({
      amount: '1.01',
      address: testKeys.t1.address,
      assetType: 'NEO',
    })

    wrapper.find('form').simulate('submit')
    expect(wrapper.state('errorMsg')).toEqual('You cannot send fractional amounts of NEO.')
  })

  test('Asset type must be valid', async () => {
    const { wrapper } = setup()

    wrapper.setState({
      amount: '1.01',
      address: testKeys.t1.address,
      assetType: 'INVALID',
    })

    wrapper.find('form').simulate('submit')
    expect(wrapper.state('errorMsg')).toEqual('Asset Type invalid.')
  })
})
