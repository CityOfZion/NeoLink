import React from 'react'
import { mount } from 'enzyme'

import ImportWallet from '../../src/app/containers/ImportWallet/ImportWallet'

describe('ImportWallet', () => {
  const validExportedJson = '{"name":"neoLinkWallet","version":"1.0","scrypt":{"n":16384,"r":8,"p":8},"accounts":[{"address":"AS7gxf414BAetThpktoyQaRNhBYxQEJ3vD","label":"test 1","isDefault":false,"lock":false,"key":"6PYMisyNfAtcUBwsrg9tR7QNaRHqwQQujCS4fZ28vqGSD8FYxNZYJaMi3T","contract":{"script":"","parameters":[{"name":"signature","type":"Signature"}],"deployed":false}},{"address":"AZ6exqhkKWiGWjBUiNqDx7wQd1BhigmN2t","label":"test 2","isDefault":false,"lock":false,"key":"6PYW9GyLAp959EsThr5jsWHDV1hYTYAFiyFu6tXJp9mBJJ51SNZni2PwxE","contract":{"script":"","parameters":[{"name":"signature","type":"Signature"}],"deployed":false}}],"extra":null}'
  const exportedJsonNoAccounts = '{"name":"neoLinkWallet","version":"1.0","scrypt":{"n":16384,"r":8,"p":8},"accounts":[],"extra":null}'

  test('Test successful import', () => {
    // eslint-disable-next-line no-undef
    const file = new Blob([validExportedJson], { type: 'text/plain' })
    const readAsText = jest.fn()
    const addEventListener = jest.fn((_, evtHandler) => { evtHandler() })
    const dummyFileReader = { addEventListener, readAsText, result: validExportedJson }
    window.FileReader = jest.fn(() => dummyFileReader)

    const wrapper = mount(<ImportWallet addAccount={ jest.fn() } />)
    wrapper.find('input').simulate('change', { target: { files: [ file ] } })

    const instance = wrapper.instance()
    // eslint-disable-next-line no-undef
    expect(FileReader).toHaveBeenCalled()
    expect(instance.state.importAccounts.length).toEqual(2)
    expect(instance.state.errorMsg).toEqual('')
    wrapper.find('form').simulate('submit')
    expect(instance.props.addAccount).toHaveBeenCalledTimes(2)
    expect(instance.state.errorMsg).toEqual('')
    expect(instance.state.success).toEqual(true)
    expect(instance.state.importAccounts.length).toEqual(0)
  })

  test('Test import of bad json', () => {
    const badJson = 'mreh'
    // eslint-disable-next-line no-undef
    const file = new Blob([badJson], { type: 'text/plain' })
    const readAsText = jest.fn()
    const addEventListener = jest.fn((_, evtHandler) => { evtHandler() })
    const dummyFileReader = { addEventListener, readAsText, result: badJson }
    window.FileReader = jest.fn(() => dummyFileReader)

    const wrapper = mount(<ImportWallet addAccount={ jest.fn() } />)
    wrapper.find('input').simulate('change', { target: { files: [ file ] } })

    const instance = wrapper.instance()
    // eslint-disable-next-line no-undef
    expect(FileReader).toHaveBeenCalled()
    expect(instance.state.importAccounts.length).toEqual(0)
    expect(instance.state.success).toEqual(false)
    expect(instance.state.errorMsg).toEqual('Unable to parse JSON')
  })

  test('Test import of json without accounts', () => {
    // eslint-disable-next-line no-undef
    const file = new Blob([exportedJsonNoAccounts], { type: 'text/plain' })
    const readAsText = jest.fn()
    const addEventListener = jest.fn((_, evtHandler) => { evtHandler() })
    const dummyFileReader = { addEventListener, readAsText, result: exportedJsonNoAccounts }
    window.FileReader = jest.fn(() => dummyFileReader)

    const wrapper = mount(<ImportWallet addAccount={ jest.fn() } />)
    wrapper.find('input').simulate('change', { target: { files: [ file ] } })

    const instance = wrapper.instance()
    // eslint-disable-next-line no-undef
    expect(FileReader).toHaveBeenCalled()
    expect(instance.state.importAccounts.length).toEqual(0)
    expect(instance.state.success).toEqual(false)
    expect(instance.state.errorMsg).toEqual('Unable to read accounts in imported wallet')
  })
})
