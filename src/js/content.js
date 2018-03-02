// content.js - currently this gets injected into all web pages when extension
// is running]

// Listen for messages from the page to do smart contract invocations.
// TODO: this should first do a test to determine gas cost and THEN do send
window.addEventListener('message', (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) {
    return
  }

  if (event.data.type && (event.data.type === 'FROM_PAGE')) {
    let scriptHash = event.data.text.scriptHash
    let operation = event.data.text.operation
    let assetType = event.data.text.assetType
    let assetAmount = event.data.text.assetAmount
    // let arg1 = event.data.text.arg1
    // let arg2 = event.data.text.arg2
    let args = event.data.text.args

    // Send an invoke to the extension background page.
    sendInvoke(scriptHash, operation, args, assetType, assetAmount)
  }
})

// Send a message to background.js to run a smart contract send invoke
// function sendInvoke (scriptHash, operation, arg1, arg2, assetType, assetAmount) {
function sendInvoke (scriptHash, operation, args, assetType, assetAmount) {
  console.log('invoking contract from content script')

  let tx = {
    'operation': operation,
    'args': args,
    'scriptHash': scriptHash,
    'amount': assetAmount,
    'type': assetType,
  }

  // send invoke contract
  chrome.runtime.sendMessage({ 'msg': 'sendInvoke', 'tx': tx }, (response) => {
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
