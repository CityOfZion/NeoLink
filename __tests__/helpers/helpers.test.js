import { getBalance, getTransactions, formatGas } from '../../src/app/utils/helpers'

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

test('formatGas formats gas under 1 correctly', () => {
  const formattedGas = formatGas([0, 1323242])
  expect(formattedGas).toBe('0.13232')
})

test('formatGas formats gas above 1 correctly', () => {
  const formattedGas = formatGas([1, 1323242])
  expect(formattedGas).toBe('1.13232')
})
