import '../img/icon-50.png'
import '../img/icon-34.png'

const bluebird = require('bluebird')

global.Promise = bluebird

function DOMPromisifier(originalMethod) {
  // return a function
  return function promisified() {
    var args = [].slice.call(arguments)
    // Needed so that the original method can be called with the correct receiver
    var self = this
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
  'browserAction'
])

promisifyAll(chrome.storage, [
  'local'
])

require('./background/popupWindow')
