import React from 'react'
import MainNav from '../MainNav'

import homeSVG from '../../../img/home.svg'

import style from './header.css'

export const getNavigation = props => {
  const { account, history, location } = props

  const loggedIn = (account.address && account.wif) || false
  const isHomepage = location.pathname === '/'

  console.log(loggedIn, isHomepage)
  console.log(location.pathname, account.address, account.wif)

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
