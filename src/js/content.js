// this gets injected into all pages currently
import util from 'util'

var loggedIn = false
var extensionInstalled = false

// var port = chrome.runtime.connect();

// listen for messages that are the results of invocations sent from the dapp through the content script
// these come from the background script in the extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var result = ''
  if(request.error) {
    console.log('content received from bg error: '+request.error)
    // document.getElementById("modalContent").innerHTML = '<br>error: ' + response.error
    result = request.error
  } else {
    result = request.msg
    console.log('content received from bg msg: '+request.msg)
  }
  if (request.loggedIn) {
    console.log('user is logged in: '+request.loggedIn)
    loggedIn = request.loggedIn
  }
  if (request.extensionInstalled) {
    extensionInstalled = request.extensionInstalled
    console.log('extension installed: '+request.extensionInstalled)
  }
  var extState = {
    loggedIn: loggedIn,
    extensionInstalled: extensionInstalled,
    result: result
  }
  // send message back to api page
  window.postMessage(extState, "*");
})

// send a content script notification to the background script to track state
// on content initialization
chrome.runtime.sendMessage({'msg': 'contentInit'}, function(response) {
  if (response.error) {
    console.log('contentInit error: '+response.error)
  } else {
    console.log('contentInit response: '+response.msg)
    if (response.loggedIn) {
      console.log('user is logged in: '+response.loggedIn)
      loggedIn = response.loggedIn
    }
    if (response.extensionInstalled) {
      extensionInstalled = response.extensionInstalled
      console.log('extension installed: '+response.extensionInstalled)
    }
    var extState = {
      loggedIn: loggedIn,
      extensionInstalled: extensionInstalled
    }
    // send message back to api page
    window.postMessage(extState, "*");
  }
})

// listen for messages from the page to do invocations
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + util.inspect(event.data.text, {depth: null}));
    // window.postMessage(event.data.text, "*");
    // window.postMessage(event.data.text, "*");
    var extState = {
      loggedIn: loggedIn,
      extensionInstalled: extensionInstalled
    }
    // send message back to api page
    // window.postMessage(extState, "*");

    var scriptHash = event.data.text.scriptHash;
    var operation = event.data.text.operation;
    var assetType = event.data.text.assetType;
    var assetAmount = event.data.text.assetAmount;
    var arg1 = event.data.text.arg1;
    var arg2 = event.data.text.arg2;

    // send an invoke to the extension background page
    sendInvoke (scriptHash, operation, arg1, arg2, assetType, assetAmount)
  }
})

function testInvoke (scriptHash, operation, arg1, arg2, assetType, assetAmount ) {
  var args = [arg1, arg2]

  var tx = {'operation': operation, 'args': args, 'scriptHash': scriptHash, 'amount': assetAmount, 'type': assetType }

  // test invoke contract
  chrome.runtime.sendMessage({'msg': 'testInvoke', 'tx': tx}, function(response) {
    if (response.error) {
      console.log('contentInit testInvoke error: '+response.error)
      window.postMessage(response.error, "*")
    } else {
      console.log('contentInit testInvoke response: '+response.msg)
      // TODO: send invoke result to page
      window.postMessage(response.msg, "*");
    }
  })
}

function sendInvoke (scriptHash, operation, arg1, arg2, assetType, assetAmount) {
  console.log('invoking contract from content script')
  var args = [arg1, arg2]

  //  var tx = {'operation': 'putvalue', 'args': args, 'scriptHash': 'b3a14d99a3fb6646c78bf2f4e2f25a7964d2956a', 'amount': price, 'type': 'GAS' }
  var tx = {'operation': operation, 'args': args, 'scriptHash': scriptHash, 'amount': assetAmount, 'type': assetType }

  // send invoke contract
  chrome.runtime.sendMessage({'msg': 'sendInvoke', 'tx': tx}, function(response) {
    if (response && response.error) {
      console.log('contentInit sendInvoke error: '+response.error)
      window.postMessage(response.error, "*");

    } else if (response && response.msg){
      console.log('contentInit sendInvoke response: '+response.msg)
      // TODO: send invoke result to page
      window.postMessage(response.msg, "*");
    } else {
      console.log('content sendInvoke unexpected error')
    }
  })
}
