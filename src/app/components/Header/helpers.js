import React from 'react'
import MainNav from '../MainNav'

import style from './Header.css'

import homeSVG from '../../../img/home.svg'

export const getNavigation = ({ account, history, location, showMenu }) => {
  if (!showMenu) return null
  const loggedIn = (account.address && account.wif) || false
  const isHomepage = location.pathname === '/'

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
