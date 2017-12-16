// content.js - currently this gets injected into all web pages when extension
// is running]

import util from 'util'

var loggedIn = false
var extensionInstalled = false

// Listen for messages that are the results of invocations sent from the dapp through the content script.
// These come from the background script in the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var result = ''
  if (request.error) {
    result = request.error
  } else {
    result = request.msg
  }
  if (request.loggedIn) {
    loggedIn = request.loggedIn
  }
  if (request.extensionInstalled) {
    extensionInstalled = request.extensionInstalled
  }
  var extState = {
    loggedIn: loggedIn,
    extensionInstalled: extensionInstalled,
    result: result
  }
  // send message back to api page
  window.postMessage(extState, '*')
})

// Listen for messages from the page to do smart contract invocations.
// TODO: this should first do a test to determine gas cost and THEN do send
window.addEventListener('message', (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) {
    return
  }

  if (event.data.type && (event.data.type === 'FROM_PAGE')) {
    var scriptHash = event.data.text.scriptHash
    var operation = event.data.text.operation
    var assetType = event.data.text.assetType
    var assetAmount = event.data.text.assetAmount
    var arg1 = event.data.text.arg1
    var arg2 = event.data.text.arg2

    // Send an invoke to the extension background page.
    sendInvoke(scriptHash, operation, arg1, arg2, assetType, assetAmount)
  }
})

// Send a message to background.js to run a smart contract send invoke
function sendInvoke (scriptHash, operation, arg1, arg2, assetType, assetAmount) {
  console.log('invoking contract from content script')
  var args = [arg1, arg2]

  //  var tx = {'operation': 'putvalue', 'args': args, 'scriptHash': 'b3a14d99a3fb6646c78bf2f4e2f25a7964d2956a', 'amount': price, 'type': 'GAS' }
  var tx = {
    'operation': operation,
    'args': args,
    'scriptHash': scriptHash,
    'amount': assetAmount,
    'type': assetType
  }

  // send invoke contract
  chrome.runtime.sendMessage({'msg': 'sendInvoke', 'tx': tx}, (response) => {
    if (response && response.error) {
      console.log('contentInit sendInvoke error: ' + response.error)
      window.postMessage(response.error, '*')
    } else if (response && response.msg) {
      console.log('contentInit sendInvoke response: ' + response.msg)
      // TODO: send invoke result to page
      window.postMessage(response.msg, '*')
    } else {
      console.log('content sendInvoke unexpected error')
    }
  })
}
