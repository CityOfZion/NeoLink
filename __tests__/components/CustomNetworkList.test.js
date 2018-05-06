import React from 'react'

import { mount } from 'enzyme'

import CustomNetworkList from '../../src/app/containers/CustomNetworkList/CustomNetworkList'

const setup = (selectedNetworkId = 'MainNet') => {
  const props = {
    networks: {
      MainNet: { name: 'MainNet', url: 'http://api.wallet.cityofzion.io', canDelete: false },
      Local: { name: 'local', url: 'http://127.0.0.1:5000', canDelete: true },
    },
    selectedNetworkId,
    config: { selectedNetworkId: 'MainNet ' },
    deleteCustomNetwork: jest.fn(),
    setNetwork: jest.fn(),
  }
  const wrapper = mount(<CustomNetworkList { ...props } />)

  return {
    wrapper,
  }
}

describe('CustomNetworkList', () => {
  test('renders without crashing', done => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })

  test('lists networks properly', async () => {
    const { wrapper } = setup()
    console.log(wrapper.html())
    // MainNet shouldn't show on this list, as it's not a custom network (canDelete = false).
    const mainNetNode = wrapper.find('.customNetworkContainer')
    console.log(mainNetNode)
    expect(wrapper.contains(expectedNode)).toEqual(false)

    // Local is a custom network and should show.
    const localNode = wrapper.find('.customNetworkContainer')
    console.log(localNode)
    expect(wrapper.contains(expectedLocalNode)).toEqual(true)
  })

  test('delete network works', async () => {
    const { wrapper } = setup('Local')
    const instance = wrapper.instance()

    // MainNet shouldn't show on this list, as it's not a custom network (canDelete = false).
    expect(wrapper.contains('MainNet')).toEqual(false)

    // Local is a custom network and should show.
    expect(wrapper.contains('local')).toEqual(true)

    wrapper.find('a').simulate('click')
    expect(instance.props.setNetwork).toHaveBeenCalledWith('MainNet')
    expect(instance.props.deleteCustomNetwork).toHaveBeenCalledWith('Local')
  })
})
