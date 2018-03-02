import React from 'react'
import PropTypes from 'prop-types'

import NetworkSwitcher from '../NetworkSwitcher'
import MainNav from '../MainNav'

import './Header.css'

const Header = (props) => {
  const { showMenu, setNetwork, selectedNetworkId, networks } = props

  return (
    <div styleName='header'>
      <NetworkSwitcher setNetwork={ setNetwork } selectedNetworkId={ selectedNetworkId } networks={ networks } />
      <div styleName='titleBar'>
        { showMenu ? <div styleName='menuNavWrapper'><MainNav /></div> : null }
        <div styleName='titleWrapper'>
          <span styleName='titleName'>NeoLink</span>
        </div>
      </div>
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
