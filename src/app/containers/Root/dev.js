import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import DevTools from '../DevTools'
import App from '../App'
import PopupWindow from '../PopupWindow'
import { history } from '../../store/configureStore'

const Fragment = React.Fragment

export default class Root extends Component {
  render () {
    const { store, isPopupWindow } = this.props
    return (
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
          <Fragment>
            { isPopupWindow
              ? <PopupWindow />
              : <App />
            }
            <DevTools />
          </Fragment>
        </ConnectedRouter>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  isPopupWindow: PropTypes.bool.isRequired,
}
