import React from 'react'
import PropTypes from 'prop-types'

import NetworkSwitcher from '../NetworkSwitcher'
import MainNav from '../MainNav'

// import globe from '../../../img/globe.svg'
// import home from '../../../img/home.svg'

import './Header.css'

const Header = props => {
  const { showMenu, setNetwork, selectedNetworkId, networks } = props

  return (
    <div styleName='header'>
      {showMenu ? (
        <div styleName='menuNavWrapper'>
          <MainNav />
        </div>
      ) : null}
      <div styleName='headerTitle'>
        <h1>NeoLink</h1>
      </div>
      <NetworkSwitcher setNetwork={ setNetwork } selectedNetworkId={ selectedNetworkId } networks={ networks } />
    </div>
  )
}

Header.propTypes = {
  showMenu: PropTypes.bool,
  selectedNetworkId: PropTypes.string,
  setNetwork: PropTypes.func,
  networks: PropTypes.object,
}

Header.defaultProps = {
  showMenu: true,
}

export default Header
