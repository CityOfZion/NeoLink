import React from 'react'
import { wallet } from '@cityofzion/neon-js'

import { mount } from 'enzyme'

import CreateWalletWithWif from '../../src/app/containers/CreateWalletWithWif/CreateWalletWithWif'

jest.useFakeTimers()

const accounts = {
  ARjkxk6VcKPFKqRHhuLNog9TbdYxhKu9be: {
    address: 'ARjkxk6VcKPFKqRHhuLNog9TbdYxhKu9be',
    isDefault: false,
    key: '6PYRop1b45uKRUVUngUr3g44UmH8Kg6KTVTAvxyKKJLVpxQsM5HXUPrzCB',
    label: 'TestKonto',
  },
}

describe('CreateWallet', () => {
  test('Creates valid credentials with manual WIF', done => {
    const passphrase = 'cityofzion123'

    const preventDefault = jest.fn()
    const addAccount = jest.fn()

    const wrapper = mount(
      <CreateWalletWithWif
        addAccount={ addAccount }
        manualWIF
        setAccount={ jest.fn }
        history={ { push: jest.fn } }
        accounts={ accounts }
      />
    )

    wrapper.find('input#encryptedWif').simulate('change', {
      target: { id: 'encryptedWif', value: '6PYQG2bP5dXuw2q6rLozSziezdA9E8esHhy2NmM1ZeSPdB2bWWAP87nb3i' },
    })
    wrapper.find('input#passPhrase').simulate('change', { target: { id: 'passPhrase', value: passphrase } })
    wrapper.find('input#label').simulate('change', { target: { id: 'label', value: 'somelabel' } })

    wrapper.find('form').simulate('submit', { preventDefault })

    jest.runAllTimers()

    process.nextTick(() => {
      expect(wrapper.state().errors.wif).toEqual('')
      expect(wrapper.state().encryptedWif).toBeTruthy()
      expect(wrapper.state().address).toBeTruthy()

      expect(wallet.isAddress(wrapper.state().address)).toEqual(true)
      expect(wrapper.state().address).toEqual('AR4zoMWmbtP1M2YsYXQtDGyZJUxB9GwNZT')
      expect(addAccount.mock.calls.length).toBe(1)
      done()
    })
  })

  test('Shows error with invalid manual WIF', done => {
    const passphrase = 'city of zion'

    const preventDefault = jest.fn()

    const wrapper = mount(
      <CreateWalletWithWif
        addAccount={ jest.fn }
        manualWIF
        setAccount={ jest.fn }
        history={ { push: jest.fn } }
        accounts={ accounts }
      />
    )

    wrapper.find('input#encryptedWif').simulate('change', {
      target: { id: 'encryptedWif', value: '!xDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr' },
    })
    wrapper.find('input#passPhrase').simulate('change', { target: { id: 'passPhrase', value: passphrase } })
    wrapper.find('input#label').simulate('change', { target: { id: 'label', value: 'somelabel' } })

    wrapper.find('form').simulate('submit', { preventDefault })

    jest.runAllTimers()

    process.nextTick(() => {
      expect(wrapper.state().errors.passPhrase).not.toEqual('')
      done()
    })
  })
})
