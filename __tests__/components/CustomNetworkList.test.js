import React from 'react'

import { shallow } from 'enzyme'

import CustomNetworkList from '../../src/app/components/CustomNetworkList'

const setup = (selectedNetworkId = 'MainNet') => {
  const props = {
    networks: {
      MainNet: { name: 'MainNet', url: 'http://api.wallet.cityofzion.io', canDelete: false },
      Local: { name: 'local', url: 'http://127.0.0.1:5000', canDelete: true },
    },
    selectedNetworkId,
    deleteCustomNetwork: jest.fn(),
    setNetwork: jest.fn(),
  }
  const wrapper = shallow(<CustomNetworkList { ...props } />)

  return {
    wrapper,
  }
}

describe('CustomNetworkList', () => {
  test('renders without crashing', (done) => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })

  test('lists networks properly', async () => {
    const { wrapper } = setup()

    // MainNet shouldn't show on this list, as it's not a custom network (canDelete = false).
    expect(wrapper.contains('MainNet')).toEqual(false)

    // Local is a custom network and should show.
    expect(wrapper.contains('local')).toEqual(true)
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
