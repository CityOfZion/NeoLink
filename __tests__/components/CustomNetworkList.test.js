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
    history: {},
    onDeleteClickHandler: jest.fn(),
    deleteCustomNetwork: jest.fn(),
    setNetwork: jest.fn(),
  }
  const wrapper = mount(<CustomNetworkList { ...props } />)

  return {
    wrapper,
  }
}

describe('CustomNetworkList', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
  })

  test('lists networks properly', async () => {
    const { wrapper } = setup()

    expect(wrapper.html().includes('MainNet')).toBe(false)
    expect(wrapper.html().includes('local')).toBe(true)
  })

  test('delete network works', async () => {
    const { wrapper } = setup('Local')
    const instance = wrapper.instance()

    wrapper.find('.dropDownButton').simulate('click')
    wrapper.find('.customNetworkDropDownButton').simulate('click')
    wrapper.find('.confirmDeleteAccept').simulate('click')

    expect(instance.props.setNetwork).toHaveBeenCalledWith('MainNet')
    expect(instance.props.deleteCustomNetwork).toHaveBeenCalledWith('Local')
  })
})
