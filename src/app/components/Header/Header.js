import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import NetworkSwitcher from '../NetworkSwitcher'
import MainNav from '../MainNav'

import home from '../../../img/home.svg'

import style from './Header.css'

const getNavigation = (props) => {
  const { account, history } = props
  const loggedIn = account.address && account.wif
  const isHomepage = history.location.pathname === '/';

  if (!loggedIn && isHomepage) {
    return;
  }

  let navigation

  if (loggedIn) {
    navigation = <MainNav />
  } else {
    navigation = (
      <button className={ style.mainNavigationNotLoggedIn } onClick={ () => history.push('/' )}>
        <img className={ style.mainNavigationNotLoggedInImg } src={ home } alt='house' />
      </button>
    )
  }

  return navigation;
}

const Header = props => {
  const { setNetwork, selectedNetworkId, networks } = props
  const navigation = getNavigation(props);
 

  return (
    <div className={ style.header }>
      <div className= { style.menuNavWrapper}>{navigation}</div>
      <div className= { style.headerTitle }>
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
  account: PropTypes.object
}

export default withRouter(Header)
