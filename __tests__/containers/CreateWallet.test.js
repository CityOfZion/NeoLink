import React from 'react'
import { wallet } from '@cityofzion/neon-js'

import { shallow, mount } from 'enzyme'

import CreateWallet from '../../src/app/containers/CreateWallet'
import Loader from '../../src/app/components/Loader'

jest.useFakeTimers()

describe('CreateWallet', () => {
  test('shows loading', () => {
    const wrapper = shallow(<CreateWallet />)
    wrapper.setState({ loading: true })
    expect(wrapper.find(Loader).length).toEqual(1)
  })

  test('Creates valid credentials', () => {
    const passphrase = 'city of zion'

    const preventDefault = jest.fn()

    const wrapper = mount(<CreateWallet />)

    wrapper.find('input#passPhraseConfirm').simulate('change', { target: { id: 'passPhraseConfirm', value: passphrase } })
    wrapper.find('input#passPhrase').simulate('change', { target: { id: 'passPhrase', value: passphrase } })
    wrapper.find('button').simulate('click')
    wrapper.find('form').simulate('submit', { preventDefault })

    jest.runAllTimers()

    expect(wrapper.state().errorMsg).toEqual('')
    expect(wrapper.text().includes(wrapper.state().encryptedWif)).toEqual(true)
    expect(wrapper.text().includes(wrapper.state().address)).toEqual(true)

    expect(wallet.isAddress(wrapper.state().address)).toEqual(true)
  })

  test('Shows error with non matching passphrases', () => {
    const passphrase = 'city of zion'
    const passphraseConfirm = 'city of paris'

    const preventDefault = jest.fn()

    const wrapper = mount(<CreateWallet />)

    wrapper.find('input#passPhraseConfirm').simulate('change', { target: { id: 'passPhraseConfirm', value: passphraseConfirm } })
    wrapper.find('input#passPhrase').simulate('change', { target: { id: 'passPhrase', value: passphrase } })
    wrapper.find('button').simulate('click')
    wrapper.find('form').simulate('submit', { preventDefault })

    jest.runAllTimers()

    expect(wrapper.state().errorMsg).not.toEqual('')
    expect(wrapper.text().includes(wrapper.state().errorMsg)).toEqual(true)
  })

  test('passphrase must be at least 10 characters', () => {
    const passphrase = '123456789'

    const preventDefault = jest.fn()

    const wrapper = mount(<CreateWallet />)

    wrapper.find('input#passPhraseConfirm').simulate('change', { target: { id: 'passPhraseConfirm', value: passphrase } })
    wrapper.find('input#passPhrase').simulate('change', { target: { id: 'passPhrase', value: passphrase } })
    wrapper.find('button').simulate('click')
    wrapper.find('form').simulate('submit', { preventDefault })

    jest.runAllTimers()

    expect(wrapper.state().errorMsg).not.toEqual('')
    expect(wrapper.text().includes(wrapper.state().errorMsg)).toEqual(true)
  })
})
