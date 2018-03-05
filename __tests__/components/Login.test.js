import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import LoginForm, { Login } from '../../src/app/components/Login/Login'
import Loader from '../../src/app/components/Loader'

describe('Login', () => {
  let store
  const validEncryptedKey = '6PYKu5U41eVSiym4getQWsfUycsWBHNUR9LmajHisK9FqWSqvfuhsqqaY9'
  const validPassword = 'testing'
  const validAccount = {
    'AVJCLubKws6JmBJkeXXsfixA6nFWmCVzVm': {
      address: 'AVJCLubKws6JmBJkeXXsfixA6nFWmCVzVm',
      label: 'Test Account',
      isDefault: false,
      key: validEncryptedKey,
    },
  }

  beforeEach(() => {
    store = createStore(combineReducers({ form: formReducer }))
  })

  test('shows loading', (done) => {
    const loginForm = mount(<Provider store={ store }><LoginForm setAccount={ jest.fn } account={ { wif: '' } } accounts={ validAccount } /></Provider>)
    loginForm.find(Login).instance().setState({ loading: true }, () => {
      loginForm.update()
      expect(loginForm.find(Loader).length).toEqual(1)
      done()
    })
  })

  test('shows create options if no wallet accounts found', () => {
    const loginForm = shallow(<Login setAccount={ jest.fn } handleSubmit={ jest.fn } reset={ jest.fn } account={ { wif: '' } } accounts={ {} } />)
    expect(loginForm.contains('CreateOrImportWallet'))
  })

  test('Returns null if already logged in', () => {
    const preLoggedIn = {
      wif: 'L3moZFQgcpyznreRqbR1uVcvrkARvRqJS4ttGfMdXGaQQR5DeYcZ',
      address: 'AQg2xUAPpA21FZMw44cpErGWekx3Hw8neA',
    }

    const loginForm = mount(<Provider store={ store }><LoginForm setAccount={ jest.fn } account={ preLoggedIn } accounts={ validAccount } /></Provider>)
    expect(loginForm.html()).toEqual(null)
  })

  test('Logs in with valid credentials', (done) => {
    const expectedAddress = 'AQg2xUAPpA21FZMw44cpErGWekx3Hw8neA'
    const expectedWif = 'L3moZFQgcpyznreRqbR1uVcvrkARvRqJS4ttGfMdXGaQQR5DeYcZ'

    const setAccount = jest.fn((wif, address) => {
      expect(wif).toEqual(expectedWif)
      expect(address).toEqual(expectedAddress)
      done()
    })

    const loginForm = mount(<Provider store={ store }><LoginForm setAccount={ setAccount } account={ { wif: '' } } accounts={ validAccount } /></Provider>)
    loginForm.find('input[name="passPhrase"]').simulate('change', { target: { name: 'passPhrase', value: validPassword } })
    loginForm.find('select').simulate('change', { target: { value: validEncryptedKey } })
    loginForm.find('button').simulate('click')
  })

  test('Shows error with invalid credentials', () => {
    jest.useFakeTimers()

    const loginForm = mount(<Provider store={ store }><LoginForm setAccount={ jest.fn } account={ { wif: '' } } accounts={ validAccount } /></Provider>)
    loginForm.find('input[name="passPhrase"]').simulate('change', { target: { id: 'passPhrase', value: 'wrong' } })
    loginForm.find('select').simulate('change', { target: { value: validEncryptedKey } })
    loginForm.find('button').simulate('click')

    jest.runAllTimers()

    const loginState = loginForm.find(Login).instance().state
    expect(loginState.errorMsg).not.toEqual('')
    expect(loginForm.text().includes(loginState.errorMsg)).toEqual(true)
  })
})
