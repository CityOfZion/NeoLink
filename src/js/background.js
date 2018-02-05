// background.js - Chrome extension persistent background page.
// popup.js is stateless so it is left to background.js to store state.

import '../img/icon-50.png'
import '../img/icon-34.png'

import * as neon from 'neon-js'
import util from "util"

// var address='AJXixUHZZsSZTrrP7ZpRqKbY2HzRawf8cB'

var state = {
  loggedIn: false,
  modalContentCache: '',
  network: 'TestNet',
  wif: null,
  useLoginAddress: false,
  address: null,
  curNavLocation: 'Home',
  formCache: {},
  auth: {
    pending: false,
    queue: []
  }
}

const ASSETS = {
  NEO: 'NEO',
  GAS: 'GAS'
}

const ASSETS_LABELS = {
  [ASSETS.NEO]: 'Neo',
  [ASSETS.GAS]: 'Gas'
}

console.log("in background")

// chrome.browserAction.onClicked.addListener(function() {
  // Fired when a browser action icon is clicked. This event will not fire if the browser action has a popup.
//   console.log('browser action!')
//
// });

// This runs every time the chrome extension is installed; mainly for
// debugging at this point.

chrome.runtime.onInstalled.addListener(function () {
  console.log('installed!')
})

// Main action message handler for background.js
// All communication with the extension runs through here

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension")
    console.log('logged in: '+state.loggedIn)
    console.log('bg onMessage: '+request.msg)
      
    switch (request.msg)
    {
      case 'contentInit':
        sendResponse({'msg': 'extension is online', 'loggedIn': state.loggedIn, 'extensionInstalled': true, 'address': state.address})
      break

      case 'getState':
        // sendResponse({'loggedIn': state.loggedIn, 'modalContentCache': state.modalContentCache})
        sendResponse(state)
        break

      case 'setState':
        state.loggedIn = request.state.loggedIn
        state.modalContentCache = request.state.modalContentCache
        state.useLoginAddress = request.state.useLoginAddress
        state.curNavLocation = request.state.curNavLocation
        state.formCache = request.state.formCache
        state.network = request.state.network
        // console.log('state: '+state)
        console.log('bg useLoginAddress: '+state.useLoginAddress)
        break

      case 'createWallet':
        break

      case 'exportWallet':
        break

      case 'loginWif':
        loginWif((e, account, loggedIn) => {
          sendResponse({'account': account, 'error': e, 'loggedIn': state.loggedIn})
        }, request.encryptedWif, request.passphrase)
        break

      case 'logout':
        state.loggedIn = false
        state.wif = null
        state.address = null
        sendResponse()
        break

      case 'send':
        send((e, res, tx) => {
          sendResponse({'msg': res, 'error': e})
        }, request.tx)
        break

      case 'testInvoke': // NOTE: does NOT require extension is logged in
        testInvokeContract((e, res, tx) => {
          sendResponse({'msg': res, 'error': e})
        }, request.tx)
        break

      case 'sendInvoke': // NOTE: DOES require extension is logged in
        // TODO: make this code clearer!

        if (!state.loggedIn) respond({'msg': 'Please login to NeoLink', 'loggedIn': state.loggedIn, 'extensionInstalled': true}, sender, sendResponse)
        else {
          if (sender.tab) { // called from dapp so lets queue for authorization by user in extension
            console.log('received auth request from dapp, queuing for auth')

            state.auth.pending = true
            state.auth.queue.push({ 'func': 'sendInvoke', 'arg': request.tx })
            respond({'msg': 'Please open NeoLink to authorize transaction', 'loggedIn': state.loggedIn, 'extensionInstalled': true}, sender, sendResponse)
            // window.open('popup.html')
          } else if (state.auth.pending) {
            console.log('received authorization result from user')

            state.auth.pending = false
            var q = state.auth.queue.pop()

            if (request.authorized) { // authorized, so get the arg off the queue and run it
              sendInvokeContract((e, res, tx) => {
                respond({'msg': res, 'error': e}, sender, sendResponse)
              }, q.arg)
            } else { // user rejected transaction so notify dapp
              respond({'msg': 'Transaction rejected by user', 'loggedIn': state.loggedIn, 'extensionInstalled': true}, sender, sendResponse)
            }
          } else {
            sendInvokeContract((e, res, tx) => {
              respond({'msg': res, 'error': e}, sender, sendResponse)
            }, request.tx)
          }
        }
        break

      case 'claim':
        break

      case 'getBalance':
        getBalance((e, res, address) => {
          sendResponse({'bals': res, 'address': address, 'error': e})
        }, request.address)
        break

      case 'getTransactionHistory':
        getTransactionHistory((e, txs) => {
          sendResponse({'msg': txs, 'error': e})
        }, request.args)
        break

    }
    console.log('logged in: '+state.loggedIn)
    return true
})

// This is a bit of kludge to decide if we are talking to content scriptHash
// or some core extension component

function respond (response, sender, sendResponse) {
  if (sender.tab) { // we are talking to the content script
    console.log('bg sending to content tab')
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, response, function(response) {
          // console.log('bg content response: '+util.inspect(response, {depth:null}))
      })
    })
  } else { // we are talking to the core extension
    sendResponse(response)
  }
}

// Call neon-js to get a list of transactions - doesnt require you to be logged
//

function getTransactionHistory (callback, address) {
  neon.getTransactionHistory(state.network, address)
    .then((transactions) => {
      callback(null, transactions)
    })
    .catch((e) => {
      console.log('caught e:'+e)
      callback(e)
      throw e
    })
}

// Call neon-js to get the balanc of an address - doesnt require logged in status

function getBalance (callback, address) {
  neon.getBalance(state.network, address)
    .then((response) => {
      console.log(address +"\nNEO Balance: " + response.NEO.balance + "\nGas Balance: " + response.GAS.balance);
      callback(null, response, address)
    }).catch((e) => {
      console.log(e)
      callback(e)
      throw e
    })
}

// Decrypt a WIF, if successful return logged in state and account details
// TODO: look at restructuring state to reduce code

function loginWif (callback, encryptedWif, passphrase) {
  console.log('bg word: '+passphrase)
  neon.decryptWIF(encryptedWif, passphrase)
    .then((wif) => {
      console.log('bg wif: '+wif)
      state.loggedIn = true
      state.wif = wif
      // returns { privateKey, publicKeyEncoded, publicKeyHash, programHash, address }
      var account = neon.getAccountFromWIFKey(wif)
      state.address = account.address
      callback(null, account, state.loggedIn)
    }).catch((e) => {
      console.log(e)
      callback(e)
      throw e
    })
}

// Call neon-js to send a neon asset to an address

function send (callback, tx) {
  // const selfAddress = address
  const assetName = tx.type === ASSETS_LABELS.NEO ? ASSETS.NEO : ASSETS.GAS
  let sendAsset = {}
  sendAsset[assetName] = tx.amount
  console.log('bg send: assetName:' + assetName + ' tx.type:' + tx.type + ' amt:' + tx.amount + ' addr:' + tx.address + ' state:' + state.wif)
  // export const doSendAsset = (net, toAddress, fromWif, assetAmounts) => {
  neon.doSendAsset(state.network, tx.address, state.wif, sendAsset)
    .then((response) => {
      if (response.result === undefined || response.result === false) {
        callback(null, 'Transaction failed: '+response.result)
        console.log('bg send failed: '+ response.result)
      } else {
        callback(null, 'Transaction succeeded: '+response.result)
        console.log('bg send succeeded: '+ response.result)
      }
    }).catch((e) => {
      console.log('bg send caught exception: '+e)
      // console.log('error: '+util.inspect(e, {depth: null}))
      callback(''+e)      // throw e
      // console.log('error: '+util.inspect(e, {depth: null}))
    })
}

function String2Hex (tmp) {
    var str = '';
    for(var i = 0; i < tmp.length; i++) {
        str += tmp[i].charCodeAt(0).toString(16)
    }
    return str
}

// Call neon-js to test invoke a smart contract.
// This will get the cost in gas, if any, for the sc execution
// TODO: look at error handling
// TODO: improve transaction result formatting

function testInvokeContract (callback, tx) {
  const assetType = tx.type === ASSETS_LABELS.NEO ? ASSETS.NEO : ASSETS.GAS
  console.log('test invoking contract')
  var gasCost = 0.001
  var operation = tx.operation
  // var args = [{'type': 7, 'value': tx.args}]
  var args = []
  tx.args.forEach((arg) => {
    if (arg !== '') args.push({'type': 7, 'value': arg})
  })

  console.log('invoke wif: ' +state.wif)
  console.log('invoke network: ' +state.network)
  console.log('invoke scriptHash: ' +tx.scriptHash)
  console.log('invoke operation: ' +operation)
  console.log('args: '+util.inspect(args,{depth:null}))

  neon.testInvokeContract(state.network, operation, args, tx.scriptHash)
    .then((response) => {
      if (response.result.stack[0].type === 'ByteArray' && response.result.stack[0].value) {
        var endian = response.result.stack[0].value

        var r = parseInt('0x'+endian.match(/../g).reverse().join(''));
        console.log('price result: '+r)

        callback(null, 'SC Return Value: ' + r + ' Transaction result: '+
          'state: ' + response.result.state +
          ' gas_consumed: ' + response.result.gas_consumed +
          ' stack: ' + util.inspect(response.result, {depth: null}))
        console.log('bg test invoke succeeded: '+ util.inspect(response.result, {depth: null}))
      } else {
        callback(null, 'Transaction result: '+
          'state: ' + response.result.state +
          ' gas_consumed: ' + response.result.gas_consumed +
          ' stack: ' + util.inspect(response.result, {depth: null}))
        console.log('bg test invoke failed: '+ util.inspect(response.result, {depth: null}))
      }
    }).catch((e) => {
      console.log('bg test invoke caught exception: '+e)
      // console.log('error: '+util.inspect(e, {depth: null}))
      callback(''+e)      // throw e
    })
}

// Call neon-js to send invoke a smart contract.
// This will execute the contract operation and requires an amount be passed
// along.
// TODO: look at error handling
// TODO: improve transaction result formatting

function sendInvokeContract (callback, tx) {
  const assetType = tx.type === ASSETS_LABELS.NEO ? ASSETS.NEO : ASSETS.GAS
  console.log('invoking contract')
  var gasCost = 0.001
  var operation = tx.operation
  // var args = [String2Hex(tx.args), String2Hex('1')]
  // var args = [String2Hex(tx.args[0]), String2Hex(tx.args[1])]
  var args = []
  tx.args.forEach((arg) => {
    if (arg !== '') args.push(String2Hex(arg))
  })

  console.log('invoke wif: ' +state.wif)
  console.log('invoke network: ' +state.network)
  console.log('invoke scriptHash: ' +tx.scriptHash)
  console.log('invoke assetType: ' +assetType)
  console.log('invoke amount: ' +tx.amount)
  console.log('invoke operation: ' +operation)
  console.log('args: '+util.inspect(args,{depth:null}))

  neon.sendInvokeContract(state.network, operation, args, tx.scriptHash, state.wif, assetType, tx.amount, 0)
    .then((response) => {
      console.log('bg send invoke succeeded: '+util.inspect(response,{depth:null}))
      callback(null, 'Transaction result: '+util.inspect(response,{depth:null}))
      // callback(null, 'Transaction result: '+
      //   'state: ' + response.result.state +
      //   ' gas_consumed: ' + response.result.gas_consumed +
      //   ' stack: ' + util.inspect(response.result, {depth: null}))
      // console.log('bg invoke failed: '+ util.inspect(response.result, {depth: null}))
    }).catch((e) => {
      console.log('bg send invoke caught exception: '+e)
      // console.log('error: '+util.inspect(e, {depth: null}))
      callback(''+e)      // throw e
    })
}
