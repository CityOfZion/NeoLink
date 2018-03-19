import '../img/icon-50.png'
import '../img/icon-34.png'

const bluebird = require('bluebird')

global.Promise = bluebird

function DOMPromisifier(originalMethod) {
  // return a function
  return function promisified() {
    let args = [].slice.call(arguments)
    // Needed so that the original method can be called with the correct receiver
    let self = this
    // which returns a promise
    return new Promise((resolve, reject) => {
      args.push(resolve, reject)
      originalMethod.apply(self, args)
    })
  }
}

function promisifyAll (obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier: DOMPromisifier }))
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
])

promisifyAll(chrome.storage, [
  'local',
])

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'NEOLINK_GET_EXTENSION_STATUS') {
    chrome.storage.local.get('state', (obj) => {
      const state = JSON.parse(obj.state)
      const address = state.account && state.account.address ? state.account.address : null

      sendResponse({
        'type': 'NEOLINK_GET_EXTENSION_STATUS_RESPONSE',
        'msg': 'extension is online',
        'isLoggedIn': address !== null,
        'extensionInstalled': true,
        'address': address,
      })
    })
  }
})

require('./background/popupWindow')
