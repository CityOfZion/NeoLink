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
    width: 350,
    height: 500
  }

  if (type === 'open') {
    options.url = 'popup.html'
    chrome.windows.create(options, (win) => {
      windowId = win.id
    })
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'sendInvoke') {
    popWindow('open')
  }
})
