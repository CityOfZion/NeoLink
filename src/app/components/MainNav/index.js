import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu'
import '@material/menu/dist/mdc.menu.min.css'
import '@material/button/dist/mdc.button.min.css'

import bars from '../../../img/bars.svg'

import style from './MainNav.css'

class MainNav extends Component {
  state = {
    menuIsOpen: false,
  }

  toggleMenu = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  render() {
    const { history } = this.props
    const { menuIsOpen } = this.state

    let dropdownMenuClasses
    if (menuIsOpen) {
      dropdownMenuClasses = `${style.mainNavDropdown} ${style.mainNavDropdownOpen}`
    } else {
      dropdownMenuClasses = style.mainNavDropdown
    }

    return (
      <nav className={ style.mainNav }>
        <button className={ style.mainNavButton } onClick={ this.toggleMenu }>
          <img src={ bars } alt='open menu icon' className={ style.mainNavButtonImg } />
        </button>
        <div className={ dropdownMenuClasses }>
          <ul>
            <li>First Item</li>
            <li>Second Item</li>
          </ul>
        </div>
        {/* <MenuAnchor>
          <div
            className={ style.menuButton }
            onClick={ e => {
              this.setState({ menuIsOpen: !this.state.menuIsOpen })
            } }
          />
          <Menu open={ this.state.menuIsOpen } onClose={ evt => this.setState({ menuIsOpen: false }) }>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/') }>
              Home
            </MenuItem>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/send') }>
              Send
            </MenuItem>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/testInvoke') }>
              Test Invoke
            </MenuItem>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/sendInvoke') }>
              Send Invoke
            </MenuItem>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/transactions') }>
              Transactions
            </MenuItem>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/balance') }>
              Balance
            </MenuItem>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/createWallet') }>
              Create Wallet
            </MenuItem>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/importWallet') }>
              Import Wallet
            </MenuItem>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/exportWallet') }>
              Export Wallet
            </MenuItem>
            <MenuItem className={ style.menuItem } onClick={ () => history.push('/config') }>
              Config
            </MenuItem>
          </Menu>
        </MenuAnchor> */}
      </nav>
    )
  }
}

export default withRouter(MainNav)

MainNav.propTypes = {
  history: PropTypes.object,
}
