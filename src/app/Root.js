import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import PopupWindow from './containers/PopupWindow'

export default class Root extends Component {
  render () {
    const { store, isPopupWindow } = this.props
    return (
      <Provider store={ store }>
        <BrowserRouter>
          { isPopupWindow
            ? <PopupWindow />
            : <App />
          }
        </BrowserRouter>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  isPopupWindow: PropTypes.bool.isRequired,
}
