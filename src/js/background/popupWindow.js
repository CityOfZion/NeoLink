let windowId = 0

function closeIfExist () {
  if (windowId > 0) {
    chrome.windows.remove(windowId)
    windowId = chrome.windows.WINDOW_ID_NONE
  }
}

function popWindow(type) {
  closeIfExist()

  const options = {
    type: 'popup',
    left: 100,
    top: 100,
    width: 310,
    height: 550
  }

  if (type === 'open') {
    options.url = 'popupWindow.html'
    var port = chrome.runtime.connect({name: 'popup'})
    chrome.windows.create(options, (win) => {
      windowId = win.id
    })

    return port
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendContentResponse) => {
  if (request.msg === 'sendInvoke') {
    const port = popWindow('open')

    chrome.runtime.onConnect.addListener((port) => {
      port.postMessage({ operation: 'sendInvoke', txInfo: request.tx, senderId: sender.tab.id })

      port.onMessage.addListener((message) => {
        if (message.msg === 'sendInvokeResponse') {
          sendContentResponse(message)
        }
      })
    })
  }
  return true
})
