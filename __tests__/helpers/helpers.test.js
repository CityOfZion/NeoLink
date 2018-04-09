import { getBalance, getTransactions } from '../../src/app/utils/helpers'

const account = { address: 'AbRWqwMFgf4P8zXZPdfNnWJ7aoEggKgnNf' }
const network = 'TestNet'

test('getBalance gets the correct balance', () => {
  return getBalance(network, account).then(data => {
    expect(data.neo).toBe(1)
    expect(data.gas).toBe(0.2)
  })
})

test('getTransactions gets the correct number of transactions', () => {
  return getTransactions(network, account).then(data => {
    expect(data.length).toBe(2)
  })
})
