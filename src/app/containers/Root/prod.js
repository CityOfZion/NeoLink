import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import App from '../App'
import PopupWindow from '../PopupWindow'
import { history } from '../../store/configureStore'

export default class Root extends Component {
  render () {
    const { store, isPopupWindow } = this.props
    return (
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
          { isPopupWindow
            ? <PopupWindow />
            : <App />
          }
        </ConnectedRouter>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  isPopupWindow: PropTypes.bool.isRequired,
}
