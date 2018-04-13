import Neon, { api } from '@cityofzion/neon-js'

export const getAccountName = (account, accounts) => {
  let result

  Object.keys(accounts).forEach(address => {
    if (address === account.address) {
      result = accounts[address].label
    }
  })

  return result
}

export const validateLength = (input, minLength) => {
  if (!input || input.length < minLength) return false
  return true
}

export const getBalance = (networks, network, account) => {
  return new Promise((resolve, reject) => {
    api[networks[network].apiType]
      .getBalance(networks[network]['url'], account.address)
      .then(results => {
        const gasAmount = results.assets['GAS'].balance.c
        const gas = formatGas(gasAmount)

        const amounts = {
          neo: Number(results.assets['NEO'].balance.c[0]),
          gas,
        }
        resolve(amounts)
      })
      .catch(error => reject(error))
  }).catch(error => console.log(error))
}

export const getTransactions = (networks, network, account) => {
  return new Promise((resolve, reject) => {
    api[networks[network].apiType]
      .getTransactionHistory(networks[network]['url'], account.address)
      .then(results => resolve(results))
      .catch(error => reject(error))
  })
}

export const formatGas = gasArray => {
  let gas

  if (gasArray.length === 1) {
    gas = gasArray[0] / 100000000000000
  } else {
    gas = gasArray[1] > 0 ? Number(gasArray.join('.')).toFixed(5) : Number(gasArray.join('.'))
  }

  return gas
}
