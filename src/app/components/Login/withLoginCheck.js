import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Login from './'

function withLoginCheck(Component) {
  class WithLoginCheckComponent extends React.Component {
    render() {
      const { account } = this.props

      if (!account || !account.wif) {
        return <Login />
      } else {
        return <Component { ...this.props } />
      }
    }
  }

  function mapStateToProps(state) {
    return { account: state.account }
  }

  WithLoginCheckComponent.propTypes = {
    account: PropTypes.object,
  }

  return connect(mapStateToProps)(WithLoginCheckComponent)
}

export default withLoginCheck
