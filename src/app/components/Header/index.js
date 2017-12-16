import React, { Component } from 'react'

import NetworkSwitcher from '../NetworkSwitcher'
import MainNav from '../MainNav'
import style from './Header.css'

export default class Header extends Component {
  render () {
    return (
      <div className={style.header}>
        <NetworkSwitcher />
        <div className={style.titleBar}>
          <div className={style.menuNavWrapper}>
            <MainNav />
          </div>
          <div className={style.titleWrapper}>
            <span className={style.titleName}>NeoLink</span>
          </div>
        </div>
      </div>
    )
  }
}
