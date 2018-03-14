import React from 'react'
import { mount, shallow } from 'enzyme'

import ExportWallet from '../../src/app/containers/ExportWallet/ExportWallet'

describe('ExportWallet', () => {
  test('Shows no accounts when there are none', () => {
    const wrapper = shallow(<ExportWallet accounts={ { } } />)
    expect(wrapper.text()).toEqual('You have no stored accounts')
  })

  test('Exports', (done) => {
    global.chrome = {
      downloads: {
        download: (args) => {
          expect(args.url).toEqual('blob-to-url')
          expect(args.saveAs).toEqual(true)
          done()
        },
      },
    }

    global.URL = {
      createObjectURL: (blob) => {
        return 'blob-to-url'
      },
    }

    const testAccount = {
      'AVJCLubKws6JmBJkeXXsfixA6nFWmCVzVm': {
        address: 'AVJCLubKws6JmBJkeXXsfixA6nFWmCVzVm',
        label: 'Test',
        isDefault: false,
        key: '6PYVW2nR8LQTdzwpr9Gh3efRbw5Jv69CSxVGbxQ7zY8nijjacwZvP3qCcW',
      },
    }
    const wrapper = mount(<ExportWallet accounts={ testAccount } />)
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn })
  })
})
