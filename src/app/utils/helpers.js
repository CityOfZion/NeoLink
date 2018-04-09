import Neon from '@cityofzion/neon-js'

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

export const getBalance = (network, account) => {
  return new Promise((resolve, reject) => {
    Neon.get
      .balance(network, account.address)
      .then(results => {
        let gas
        const gasAmount = results.assets['GAS'].balance.c

        if (gasAmount.length === 1) {
          gas = results.assets['GAS'].balance.c[0] / 100000000000000
        } else {
          gas =
            results.assets['GAS'].balance.c[1] > 0
              ? Number(results.assets['GAS'].balance.c.join('.')).toFixed(5)
              : Number(results.assets['GAS'].balance.c.join('.'))
        }

        const amounts = {
          neo: Number(results.assets['NEO'].balance.c[0]),
          gas,
        }

        resolve(amounts)
      })
      .catch(error => reject(error))
  })
}

export const getTransactions = (network, account) => {
  return new Promise((resolve, reject) => {
    Neon.get
      .transactionHistory(network, account.address)
      .then(results => resolve(results))
      .catch(error => reject(error))
  })
}
