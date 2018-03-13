import React from 'react'
import PropTypes from 'prop-types'

import NetworkSwitcher from '../NetworkSwitcher'
import MainNav from '../MainNav'

import homeSVG from '../../../img/home.svg'

import style from './Header.css'

const getNavigation = props => {
  const { account, history, location } = props

  const loggedIn = (account.address && account.wif) || false
  const isHomepage = location.pathname === '/'

  console.log(account, location.pathname, loggedIn)

  if (!loggedIn && isHomepage) {
    return
  }

  let navigation

  if (loggedIn) {
    navigation = <MainNav />
  } else {
    navigation = (
      <button className={ style.mainNavigationNotLoggedIn } onClick={ () => history.push('/') }>
        <img className={ style.mainNavigationNotLoggedInImg } src={ homeSVG } alt='house' />
      </button>
    )
  }

  return navigation
}

const Header = props => {
  const { setNetwork, selectedNetworkId, networks } = props
  const navigation = getNavigation(props)

  return (
    <div className={ style.header }>
      <div className={ style.menuNavWrapper }>{navigation}</div>
      <div className={ style.headerTitle }>
        <h1>NeoLink</h1>
      </div>
      <NetworkSwitcher setNetwork={ setNetwork } selectedNetworkId={ selectedNetworkId } networks={ networks } />
    </div>
  )
}

Header.propTypes = {
  selectedNetworkId: PropTypes.string,
  setNetwork: PropTypes.func,
  networks: PropTypes.object,
  account: PropTypes.object,
  history: PropTypes.object,
}

export default Header
