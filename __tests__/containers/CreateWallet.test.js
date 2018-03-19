import React from 'react'
import { wallet } from '@cityofzion/neon-js'

import { shallow, mount } from 'enzyme'

import CreateWallet from '../../src/app/containers/CreateWallet/CreateWallet'
import Loader from '../../src/app/components/Loader'

jest.useFakeTimers()

describe('CreateWallet', () => {
  test('shows loading', () => {
    const wrapper = shallow(<CreateWallet addAccount={ jest.fn } />)
    wrapper.setState({ loading: true })
    expect(wrapper.find(Loader).length).toEqual(1)
  })

  test('Creates valid credentials', () => {
    const passphrase = 'city of zion'

    const preventDefault = jest.fn()
    const addAccount = jest.fn()

    const wrapper = mount(<CreateWallet addAccount={ addAccount } />)

    wrapper.find('input#passPhraseConfirm').simulate('change', { target: { id: 'passPhraseConfirm', value: passphrase } })
    wrapper.find('input#passPhrase').simulate('change', { target: { id: 'passPhrase', value: passphrase } })
    wrapper.find('button').simulate('click')
    wrapper.find('form').simulate('submit', { preventDefault })

    jest.runAllTimers()

    expect(wrapper.state().errorMsg).toEqual('')
    expect(wrapper.text().includes(wrapper.state().encryptedWif)).toEqual(true)
    expect(wrapper.text().includes(wrapper.state().address)).toEqual(true)

    expect(wallet.isAddress(wrapper.state().address)).toEqual(true)
    expect(addAccount.mock.calls.length).toBe(1)
  })

  test('Shows error with non matching passphrases', () => {
    const passphrase = 'city of zion'
    const passphraseConfirm = 'city of paris'

    const preventDefault = jest.fn()

    const wrapper = mount(<CreateWallet addAccount={ jest.fn } />)

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

    const wrapper = mount(<CreateWallet addAccount={ jest.fn } />)

    wrapper.find('input#passPhraseConfirm').simulate('change', { target: { id: 'passPhraseConfirm', value: passphrase } })
    wrapper.find('input#passPhrase').simulate('change', { target: { id: 'passPhrase', value: passphrase } })
    wrapper.find('button').simulate('click')
    wrapper.find('form').simulate('submit', { preventDefault })

    jest.runAllTimers()

    expect(wrapper.state().errorMsg).not.toEqual('')
    expect(wrapper.text().includes(wrapper.state().errorMsg)).toEqual(true)
  })

  test('Creates valid credentials with manual WIF', () => {
    const passphrase = 'city of zion'

    const preventDefault = jest.fn()
    const addAccount = jest.fn()

    const wrapper = mount(<CreateWallet addAccount={ addAccount } manualWIF />)

    wrapper.find('input#wif').simulate('change', { target: { id: 'wif', value: 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr' } })
    wrapper.find('input#passPhraseConfirm').simulate('change', { target: { id: 'passPhraseConfirm', value: passphrase } })
    wrapper.find('input#passPhrase').simulate('change', { target: { id: 'passPhrase', value: passphrase } })
    wrapper.find('button').simulate('click')
    wrapper.find('form').simulate('submit', { preventDefault })

    jest.runAllTimers()

    expect(wrapper.state().errorMsg).toEqual('')
    expect(wrapper.text().includes(wrapper.state().encryptedWif)).toEqual(true)
    expect(wrapper.text().includes(wrapper.state().address)).toEqual(true)

    expect(wallet.isAddress(wrapper.state().address)).toEqual(true)
    expect(wrapper.state().address).toEqual('AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y')
    expect(addAccount.mock.calls.length).toBe(1)
  })

  test('Shows error with invalid manual WIF', () => {
    const passphrase = 'city of zion'

    const preventDefault = jest.fn()

    const wrapper = mount(<CreateWallet addAccount={ jest.fn } manualWIF />)

    wrapper.find('input#wif').simulate('change', { target: { id: 'wif', value: '!xDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr' } })
    wrapper.find('input#passPhraseConfirm').simulate('change', { target: { id: 'passPhraseConfirm', value: passphrase } })
    wrapper.find('input#passPhrase').simulate('change', { target: { id: 'passPhrase', value: passphrase } })
    wrapper.find('button').simulate('click')
    wrapper.find('form').simulate('submit', { preventDefault })

    jest.runAllTimers()

    expect(wrapper.state().errorMsg).not.toEqual('')
  })
})
