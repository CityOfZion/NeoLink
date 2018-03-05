import React from 'react'

import { shallow } from 'enzyme'

import NetworkSwitcher from '../../src/app/components/NetworkSwitcher'

const setup = () => {
  const props = {
    selectedNetworkId: 'MainNet',
    networks: {
      MainNet: { name: 'MainNet', url: 'http://api.wallet.cityofzion.io', canDelete: false },
      TestNet: { name: 'TestNet', url: 'http://testnet-api.wallet.cityofzion.io', canDelete: false },
      CoZTestNet: { name: 'CoZ TestNet', url: 'http://coz-privatenet.herokuapp.com/', canDelete: false },
    },
    setNetwork: jest.fn(),
  }
  const wrapper = shallow(<NetworkSwitcher { ...props } />)

  return {
    wrapper,
  }
}

describe('NetworkSwitch', () => {
  test('renders without crashing', done => {
    const { wrapper } = setup()
    expect(wrapper).toMatchSnapshot()
    done()
  })

  test('correctly renders MainNet initially', () => {
    const { wrapper } = setup()

    const networkSelectorElement = wrapper.find('button[data-value="MainNet"]')

    expect(networkSelectorElement.children().length).toBe(3)
  })

  test('switches to the correct network when chosen from the dropdown', async () => {
    const { wrapper } = setup()

    const instance = wrapper.instance()
    const networkSelector = wrapper.find('.networkNavigationDropdown')

    console.log(networkSelector)

    networkSelector.simulate('click', { target: { dataset: { value: 'TestNet' } } })

    expect(instance.props.setNetwork).toHaveBeenCalledWith('TestNet')

    networkSelector.simulate('click', { target: { dataset: { value: 'MainNet' } } })

    expect(instance.props.setNetwork).toHaveBeenCalledWith('MainNet')
  })
})
