import wallet from '../../src/app/reducers/wallet'
import { ADD_WALLET_ACCOUNT, DELETE_WALLET_ACCOUNT } from '../../src/app/constants/ActionTypes'

describe('wallet', () => {
  test('adds account', () => {
    const mockedExport = jest.fn(() => { return 'wallet object' })
    const action = {
      type: ADD_WALLET_ACCOUNT,
      account: {
        address: 'abc',
        export: mockedExport,
      },
    }

    const result = wallet({ accounts: { } }, action)
    expect(Object.keys(result.accounts).length).toEqual(1)
    expect(result.accounts.hasOwnProperty('abc')).toEqual(true)

    const action2 = {
      type: ADD_WALLET_ACCOUNT,
      account: {
        address: 'cba',
        export: mockedExport,
      },
    }

    const result2 = wallet(result, action2)
    expect(Object.keys(result2.accounts).length).toEqual(2)
    expect(result2.accounts.hasOwnProperty('abc')).toEqual(true)
    expect(result2.accounts.hasOwnProperty('cba')).toEqual(true)
  })

  test('deletes account', () => {
    const initialState = {
      accounts: {
        abc: {
          // this would normally a full wallet object, but we don't need all that for the test.
          address: 'abc',
        },
        cba: {
          address: 'bca',
        },
      },
    }

    const action = {
      type: DELETE_WALLET_ACCOUNT,
      account: {
        address: 'cba',
      },
    }

    const result = wallet(initialState, action)
    expect(Object.keys(result.accounts).length).toEqual(1)
    expect(result.accounts.hasOwnProperty('abc')).toEqual(true)
    expect(result.accounts.hasOwnProperty('cba')).toEqual(false)
  })
})
