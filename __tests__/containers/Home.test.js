import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import MockStore from '../../__mocks__/store'
import { StaticRouter } from 'react-router'

import Home from '../../src/app/containers/Home/Home'

describe('Home', () => {
  const store = new MockStore()
  const props = {
    walletActions: {
      changeLabel: () => {},
    },
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

  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <Provider store={ store }>
        <StaticRouter>
          <Home { ...props } />
        </StaticRouter>
      </Provider>
    )
  })

  test('changes account label', () => {
    wrapper.find('.accountDropDownButton').simulate('click')
    wrapper.find('.dropDownLinksButton').simulate('click')

    wrapper.find('.inputField').simulate('change', { target: { value: 'new account name' } })
    wrapper.find('.renameAccountForm').simulate('submit')

    const accountName = wrapper.find('.accountInfoDetailsHeading').text()
    expect(accountName).toBe('new account name')
  })
})
