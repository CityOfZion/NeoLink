import { formatGas } from '../../src/app/utils/helpers'

// const account = { address: 'AbRWqwMFgf4P8zXZPdfNnWJ7aoEggKgnNf' }
// const network = 'TestNet'
// const networks = {
//   CoZTestNet: {
//     name: 'CoZ TestNet',
//     url: 'https://coz.neoscan-testnet.io/api/main_net',
//     canDelete: false,
//     apiType: 'neoscan',
//   },
//   MainNet: { name: 'MainNet', url: 'https://api.neoscan.io/api/main_net', canDelete: false, apiType: 'neoscan' },
//   TestNet: { name: 'TestNet', url: 'https://neoscan-testnet.io/api/test_net', canDelete: false, apiType: 'neoscan' },
// }

// test('getBalance gets the correct balance', () => {
//   return getBalance(networks, network, account).then(data => {
//     expect(data.neo).toBe(1)
//     expect(data.gas).toBe(0.2)
//   })
// })

// test('getBalance works with neonDB', () => {
//   const networks = {
//     CoZTestNet: {
//       name: 'CoZ TestNet',
//       url: 'http://coz-privatenet.herokuapp.com/',
//       canDelete: false,
//       apiType: 'neonDB',
//     },
//     MainNet: { name: 'MainNet', url: 'http://api.wallet.cityofzion.io', canDelete: false, apiType: 'neonDB' },
//     TestNet: { name: 'TestNet', url: 'http://testnet-api.wallet.cityofzion.io', canDelete: false, apiType: 'neonDB' },
//   }

//   return getBalance(networks, network, account).then(data => {
//     expect(data.neo).toBe(1)
//     expect(data.gas).toBe(0.2)
//   })
// })

// test('getTransactions gets the correct number of transactions', () => {
//   return getTransactions(networks, network, account).then(data => {
//     expect(data.length).toBe(2)
//   })
// })

test('formatGas formats gas under 1 correctly', () => {
  const formattedGas = formatGas([0, 1323242])
  expect(formattedGas).toBe('0.13232')
})

test('formatGas formats gas above 1 correctly', () => {
  const formattedGas = formatGas([1, 1323242])
  expect(formattedGas).toBe('1.13232')
})
