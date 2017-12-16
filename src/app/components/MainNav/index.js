import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import Menu from 'preact-material-components/Menu'
import 'preact-material-components/List/style.css'
import 'preact-material-components/Menu/style.css'

import style from './MainNav.css'

export default class MainNav extends Component {
  render () {
    return (
      <div className={style.menu}>
        <Menu.Anchor>
          <div
            className={style.menuButton}
            onClick={e => {
              this.menu.MDComponent.open = true
            }}
          />
          <Menu open={false}
            ref={menu => {
              this.menu = menu
            }}
          >
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/send'>Send</Link>
            </Menu.Item>
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/testInvoke'>Test Invoke</Link>
            </Menu.Item>
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/sendInvoke'>Send Invoke</Link>
            </Menu.Item>
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/transactions'>Transactions</Link>
            </Menu.Item>
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/balance'>Balance</Link>
            </Menu.Item>
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/createWallet'>Create Wallet</Link>
            </Menu.Item>
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/importWallet'>Import Wallet</Link>
            </Menu.Item>
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/exportWallet'>Export Wallet</Link>
            </Menu.Item>
            <Menu.Item className={style.menuItem}>
              <Link className={style.menuItemLink} to='/config'>Config</Link>
            </Menu.Item>
          </Menu>
        </Menu.Anchor>
      </div>
    )
  }
}
