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
    height: 570,
  }

  if (type === 'open') {
    options.url = 'popupWindow.html'
    let port = chrome.runtime.connect({ name: 'popup' })
    chrome.windows.create(options, (win) => {
      windowId = win.id
    })

    return port
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendContentResponse) => {
  if (request.type === 'NEOLINK_SEND_INVOKE') {
    const port = popWindow('open') // eslint-disable-line no-unused-vars

    chrome.runtime.onConnect.addListener((port) => {
      port.postMessage({ operation: 'POPUP_SEND_INVOKE', txInfo: request.tx, senderId: sender.tab.id })

      port.onMessage.addListener((message) => {
        if (message.type === 'NEOLINK_SEND_INVOKE_RESPONSE') {
          sendContentResponse(message)
        }
      })
    })
  }
  return true
})
