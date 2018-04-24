import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import MockStore from '../../__mocks__/MockStore'
import { StaticRouter } from 'react-router'

import Home from '../../src/app/containers/Home/Home'

describe('Home', () => {
  const store = new MockStore()
  const props = {
    walletActions: {
      changeLabel: () => {},
    },
    accountActions: { setBalance: () => {} },
    selectedNetworkId: 'TestNet',
    account: {
      address: 'ARjkxk6VcKPFKqRHhuLNog9TbdYxhKu9be',
      wif: 'KxyKz2LaFSCi2UQtpxnXs3jdzE5uAxguBRSgbiXMi6adkbivt2ub',
    },
    accounts: {
      ARjkxk6VcKPFKqRHhuLNog9TbdYxhKu9be: {
        address: 'ARjkxk6VcKPFKqRHhuLNog9TbdYxhKu9be',
        isDefault: false,
        key: '6PYRop1b45uKRUVUngUr3g44UmH8Kg6KTVTAvxyKKJLVpxQsM5HXUPrzCB',
        label: 'TestKonto',
      },
    },
  }

  test('changes account label', () => {
    const wrapper = mount(
      <Provider store={ store }>
        <StaticRouter context={ {} }>
          <Home { ...props } />
        </StaticRouter>
      </Provider>
    )

    wrapper.find('.accountDropDownButton').simulate('click')
    wrapper.find('.dropDownLinksButton').simulate('click')

    wrapper.find('.inputField').simulate('change', { target: { value: 'new account name' } })
    wrapper.find('.renameAccountForm').simulate('submit')

    const accountName = wrapper.find('.accountInfoDetailsHeading').text()
    expect(accountName).toBe('new account name')
  })

  test('calls correct functions when mounted', () => {
    const wrapper = shallow(<Home { ...props } />)

    wrapper.instance().getHomeScreenBalance = jest.fn()
    wrapper.instance().getHomeScreenTransactions = jest.fn()

    wrapper.instance().componentDidMount()

    expect(wrapper.instance().getHomeScreenBalance).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().getHomeScreenTransactions).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().getHomeScreenBalance).toHaveBeenLastCalledWith('TestNet')
    expect(wrapper.instance().getHomeScreenTransactions).toHaveBeenLastCalledWith('TestNet')
  })

  test('calls getBalance and getTransactions correctly', () => {
    const getBalance = jest.fn()
    const getTransactions = jest.fn()

    const wrapper = shallow(<Home { ...props } getBalance={ getBalance } getTransactions={ getTransactions } />)

    wrapper.instance().getHomeScreenBalance = jest.fn()
    wrapper.instance().getHomeScreenTransactions = jest.fn()

    wrapper.instance().componentDidMount()

    expect(getBalance).toHaveBeenCalledTimes(1)
    expect(getTransactions).toHaveBeenCalledTimes(1)
  })
})
