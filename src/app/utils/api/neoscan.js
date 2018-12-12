// Neoscan.js
// This contains utility helpers for accessing Neoscan API

// TODO abstract api choice into an api config option and dynamically map to selected at runtime
// TODO composable url retrieval

import axios from 'axios'

// import { get } from 'lodash'
// import { Fixed8 } from '../math'
import { logDeep } from '../debug'

import Promise from 'bluebird'

// TODO Reintegrate this (neoscanIni bits) with state tree

let neoscanIni = {}

neoscanIni.active = {}
neoscanIni.mainNet = {}
neoscanIni.mainNet.rootUrl = 'https://neoscan.io/api/main_net/'
neoscanIni.mainNet.addressUrl = 'https://neoscan.io/address/'
neoscanIni.mainNet.txSiteUrl = 'https://neoscan.io/transaction/'
neoscanIni.mainNet.txByIdUrl = 'https://neoscan.io/api/main_net/v1/get_transaction/'
neoscanIni.mainNet.txsByAddressUrl = 'https://neoscan.io/api/main_net/v1/get_last_transactions_by_address/'
neoscanIni.mainNet.balanceUrl = 'https://neoscan.io/api/main_net/v1/get_balance/'

neoscanIni.testNet = {}
neoscanIni.testNet.rootUrl = 'https://neoscan-testnet.io/api/test_net/'
neoscanIni.testNet.addressUrl = 'https://neoscan-testnet.io/address/'
neoscanIni.testNet.txSiteUrl = 'https://neoscan.io/transaction/'
neoscanIni.testNet.txByIdUrl = 'https://neoscan-testnet.io/api/test_net/v1/get_transaction/'
neoscanIni.testNet.txsByAddressUrl = 'https://neoscan-testnet.io/api/test_net/v1/get_last_transactions_by_address/'
neoscanIni.testNet.balanceUrl = 'https://neoscan-testnet.io/api/test_net/v1/get_balance/'

// Stub this out for any custom net that may come along.
// Rather than make these an array, let's create them by a custom name right on the object - neoscainIni.myCustom, for example
// Then just set neoscanIni.active to that entry.
// Store the whole thing for later management.
neoscanIni.custom = {}
neoscanIni.custom.rootUrl = 'https://neoscan-testnet.io/api/test_net/'
neoscanIni.custom.addressUrl = 'https://neoscan-testnet.io/address/'
neoscanIni.custom.txSiteUrl = 'https://neoscan.io/transaction/'
neoscanIni.custom.txByIdUrl = 'https://neoscan-testnet.io/api/test_net/v1/get_transaction/'
neoscanIni.custom.txsByAddressUrl = 'https://neoscan-testnet.io/api/test_net/v1/get_last_transactions_by_address/'
neoscanIni.custom.balanceUrl = 'https://neoscan-testnet.io/api/test_net/v1/get_balance/'

let curState = {}

// Behavioral Configuration

let defly = false // debugging flag - toggle with debug() or debug(bool)

let transactionLimit = 0 // limits the number of returned transactions
// eslint-disable-next-line
let humanDates = false // mutate the date format to human-readable (hardcoded to generic date string for now)

// debug = true | turns on verbose activity console printing

export const debug = (debug) => {
  if (!debug) defly = debug
  else defly = !defly
  if (defly) console.log('neoscan api debugging enabled')
  else console.log('This is your last debugging message! neoscan api debugging disabled')
}

// Run this to configure API
// See "Behavioral Configuration" above

export const configure = (cfgObj) => {
  ({ transactionLimit, humanDates } = cfgObj)
}

// ../storage.js adds this as a subscriber to listen for state changes.
// I'm not sure this is the right approach as we still can't sync state yet.
// TODO figure out how to sync state and do this whole bit properly
export const syncState = state => {
  curState = state
}

// Check if our url is properly formed. If url can't construct it in try, it isn't.
const validateUrl = url => {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line
      const u = new URL(url)
      if (defly) console.log('neoscan.validateUrl(' + url + ')')
      resolve(url)
    } catch (error) {
      console.log('neoscan.validateUrl(' + url + '): ' + error.message)
      reject(error)
    }
  })
}

export const setNet = networkId => {
  if (defly) console.log('set_net(' + networkId + ')')

  return switchNetwork(networkId)
}

export const getNet = () => {
  let net
  if (curState && curState.config && curState.config.neoscan && curState.config.neoscan.active) net = curState.config.neoscan.active
  return net
}

// MAKE GAS PERDY

export const formatGas = gasArray => {
  let gas
  if (gasArray.length === 1) {
    gas = gasArray[0] / 100000000000000
  } else {
    gas = gasArray[1] > 0 ? Number(gasArray.join('.')).toFixed(5) : Number(gasArray.join('.'))
  }

  return gas
}

export const switchNetwork = networkId => {
  let net
  switch (networkId) {
    case 'MainNet':
      if (curState && curState.config && curState.config.neoscan && curState.config.neoscan.mainNet && curState.config.neoscan.active) {
        net = curState.config.neoscan.active = curState.config.neoscan.mainNet
      } else {
        curState = {
          config: {
            neoscan: {
              active: neoscanIni.mainNet,
            },
          },
        }
        net = curState.config.neoscan.active
      }
      break
    case 'TestNet':
      if (curState && curState.config && curState.config.neoscan && curState.config.neoscan.testNet && curState.config.neoscan.active) {
        net = curState.config.neoscan.active = curState.config.neoscan.testNet
      } else {
        curState = {
          config: {
            neoscan: {
              active: neoscanIni.testNet,
            },
          },
        }
        net = curState.config.neoscan.active
      }
      break
    default:
      if (!networkId) return undefined

      if (curState && curState.config && curState.config.neoscan && curState.config.networks && curState.config.networks[networkId]) {
        net = curState.config.neoscan.active = curState.config.networks[networkId]
      } else {
        console.log('networkId' + networkId)
        let u = curState.config.neoscan[networkId].url
        let custom = {}
        custom.name = curState.config.neoscan[networkId].name
        custom.rootUrl = u + '/api/test_net/'
        custom.addressUrl = u + '/address/'
        custom.txByIdUrl = u + '/api/test_net/v1/get_transaction/'
        custom.txsByAddressUrl = u + '/api/test_net/v1/get_last_transactions_by_address/'
        custom.balanceUrl = u + '/api/test_net/v1/get_balance/'
        custom.canDelete = true
        custom.apiType = 'neoscan'
        curState = {
          config: {
            neoscan: {
              active: custom,
            },
          },
        }
        net = curState.config.neoscan.active
      }
      break
  }
  if (defly) logDeep('net', net)

  return net
}

// Returns the full URL all the way up to the version.
// I.e., 'https://neoscan.io/api/main_net/'

export const getRootUrl = () => {
  return validateUrl(curState.config.neoscan.active.rootUrl)
}

// Returns the full URL all the way up to the args.
// I.e., 'https://neoscan.io/api/main_net/v1/get_transaction/'

export const getTxByIdUrl = txid => {
  if (txid) {
    return validateUrl(curState.config.neoscan.active.txByIdUrl + '/' + txid + '/')
  } else {
    return validateUrl(curState.config.neoscan.active.txByIdUrl)
  }
}

// Returns the full URL all the way up to the args.
// I.e., 'https://neoscan.io/api/main_net/v1/get_last_transactions_by_address/'
// TODO add page argument format = address + '/' + page

export const getTxsByAddressUrl = address => {
  if (address) return validateUrl(curState.config.neoscan.active.txsByAddressUrl + '/' + address + '/')
  else return validateUrl(curState.config.neoscan.active.txsByAddressUrl)
}

// Returns the full URL all the way up to the args.
// I.e., 'https://neoscan.io/api/main_net/v1/get_transaction/'

export const getBalanceUrl = address => {
  if (address) {
    return validateUrl(curState.config.neoscan.active.balanceUrl + address + '/')
  } else return validateUrl(curState.config.neoscan.active.balanceUrl)
}

// get_address_abstracts for an address
// This is a transaction list with a summary control header, f.e.:
// { total_pages: 9,
//    total_entries: 130,
//    page_size: 15,
//    page_number: 1,
// TODO add 'more' feature

export const getAddressAbstracts = (address, page) => {
  return new Promise((resolve, reject) => {
    getRootUrl(address).then(url => {
      if (defly) console.log('neoscan.getAddressAbstracts(' + address + ', ' + page + ')')
      return axios
        .get(url + '/v1/get_address_abstracts/' + address + '/' + page)
        .then(response => {
          response.data.address = address
          resolve({ data: response.data, address: address })
        })
        .catch(error => {
          console.log('neoscan.get_address_abstracts(): ' + error)
          reject(error)
        })
    })
  })
}

// Returns the full URL all the way up to the args.
// I.e., 'https://neoscan.io/api/main_net/v1/get_last_transactions_by_address/'
// TODO add page argument format = address + '/' + page

export const getLastTransactionsByAddressUrl = (address, page) => {
  if (address) return validateUrl(curState.config.neoscan.active.txsByAddressUrl + '/' + address + '/' + page)
  else return validateUrl(curState.config.neoscan.active.txsByAddressUrl)
}

// Get all transactions for an address
export const getLastTransactionsByAddress = (address, page) => {
  let pageArg = page || '1'

  return new Promise((resolve, reject) => {
    getLastTransactionsByAddressUrl(address, pageArg).then(url => {
      if (defly) console.log(url)
      return axios
        .get(url)
        .then(response => {
          if (defly) console.log('neoscan.getLastTransactionsByAddress(' + address + ', ' + pageArg + ')')
          response.data.address = address
          resolve({ data: transactionLimit ? response.data[transactionLimit] : response.data, address: address })
          // resolve({ data: response.data[1], address: address })
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

// Get a single transaction by transaction id

export const getTransaction = txid => {
  return new Promise((resolve, reject) => {
    getTxByIdUrl(txid).then(url => {
      if (defly) console.log('neoscan.getTransaction(' + txid + ')')
      return axios
        .get(url)
        .then(response => {
          // console.log('response: ' + response.data)
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

// getBalance for an address
// /api/test_net/v1/get_balance/{address}
// Returns the balance for an address including NEP-5 Tokens.
//
// URI ParametersHide
// address
// string (required)
// base 58 address

export const getBalance = address => {
  return new Promise((resolve, reject) => {
    getBalanceUrl(address).then(url => {
      if (defly) console.log('neoscan.getBalance(' + url + ')')
      return axios
        .get(url)
        .then(response => {
          let data = response.data
          let assets = {}

          // Next line is new, keeping the above for backwards compatibility with current codebase (for now).
          // The plan is to follow neoscan get_balance json result format. I.e.,
          // _tokens[asset] = {
          //    name: 'Contract Token X',
          //    symbol: 'CTX',
          //    hash: '9aff1e08aea2048a26a3d2ddbb3df495b932b1e7',
          //    amount: 10000
          // }

          assets._tokens = []

          if (data.address === 'not found') {
            assets = {
              neo: 0,
              gas: 0,
            }
          } else {
            data.balance.map(b => {
              if (b.asset === 'NEO') {
                assets['neo'] = b.amount
              } else if (b.asset === 'GAS') {
                assets['gas'] = b.amount
              } else if (b.amount) {
                assets[b.asset] = b.amount

                const token = {
                  'name': b.asset,
                  'symbol': b.asset_symbol,
                  'hash': b.asset_hash,
                  'amount': b.amount,
                }

                assets._tokens.push(token)
              }
            })
          }
          resolve(assets)
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

export const parseUnspent = unspentArr => {
  return unspentArr.map(coin => {
    return {
      index: coin.n,
      txid: coin.txid,
      value: coin.value,
    }
  })
}

export const getUnclaimedUrl = address => {
  return validateUrl(curState.config.neoscan.active.rootUrl + '/v1/get_unclaimed/' + address)
}

// Returns the unclaimed gas for an address from its hash.

export const getUnclaimed = address => {
  return new Promise((resolve, reject) => {
    this.getUnclaimedUrl(address).then(url => {
      if (defly) console.log('neoscan.getUnclaimed(' + address + ')')
      return axios
        .get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

export const getClaimableUrl = address => {
  return validateUrl(curState.config.neoscan.active.rootUrl + '/v1/get_claimable/' + address)
}

// Returns the AVAILABLE claimable transactions for an address, from its hash.

export const getClaimable = address => {
  return new Promise((resolve, reject) => {
    this.getClaimableUrl(address).then(url => {
      if (defly) console.log('neoscan.getClaimable(' + address + ')')
      return axios
        .get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

export const getClaimedUrl = address => {
  return validateUrl(curState.config.neoscan.active.rootUrl + '/v1/get_claimed/' + address)
}

// Returns the claimed transactions for an address, from its hash

export const getClaimed = address => {
  return new Promise((resolve, reject) => {
    this.getClaimedUrl(address).then(url => {
      if (defly) console.log('neoscan.getClaimed(' + address + ')')
      return axios
        .get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

export const getHeightUrl = () => {
  return validateUrl(curState.config.neoscan.active.rootUrl + '/v1/get_height')
}

// Returns latest block index of the neoscan db.

export const getHeight = () => {
  return new Promise((resolve, reject) => {
    this.getHeightUrl().then(url => {
      if (defly) console.log('neoscan.getHeight()')
      return axios
        .get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}

export const getBlockUrl = hash => {
  return validateUrl(curState.config.neoscan.active.rootUrl + '/v1/get_block/' + hash)
}

// Returns the block model from its hash or index

export const getBlock = (hash) => {
  return new Promise((resolve, reject) => {
    this.getBlockUrl(hash).then(url => {
      if (defly) console.log('neoscan.getBlock(' + hash + ')')
      return axios
        .get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          // eslint-disable-next-line
          reject('neoscan.getBlock(' + hash + '): ' + error + 'If this is a 404 it is likely because the block does not exist.')
        })
    })
  })
}

export const getAllNodesUrl = () => {
  return validateUrl(curState.config.neoscan.active.rootUrl + '/v1/get_all_nodes')
}

// Returns all working nodes and their respective heights. Information is updated each minute.

export const getAllNodes = () => {
  return new Promise((resolve, reject) => {
    this.getAllNodesUrl().then(url => {
      if (defly) console.log('neoscan.getAllNodes')
      return axios
        .get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}
