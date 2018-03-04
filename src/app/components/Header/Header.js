import React from 'react'
import PropTypes from 'prop-types'

import NetworkSwitcher from '../NetworkSwitcher'
import MainNav from '../MainNav'

import home from '../../../img/home.svg'

import style from './Header.css'

const Header = props => {
  const { showMenu, setNetwork, selectedNetworkId, networks, account } = props
  const loggedIn = account.address && account.wif
  let navigation

  if (loggedIn) {
    navigation = <MainNav />
  } else {
    navigation = (
      <button className={ style.mainNavigationNotLoggedIn }>
        <img className={ style.mainNavigationNotLoggedInImg } src={ home } alt='house' />
      </button>
    )
  }

  return (
    <div styleName='header'>
      <div styleName='menuNavWrapper'>{navigation}</div>
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
