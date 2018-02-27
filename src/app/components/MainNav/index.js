import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu'
import '@material/menu/dist/mdc.menu.min.css'
import '@material/button/dist/mdc.button.min.css'

import style from './MainNav.css'

class MainNav extends Component {
	state = {
	  menuIsOpen: false,
	}

	render() {
	  const { history } = this.props

	  return (
  <div className={ style.menu }>
  <MenuAnchor>
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
	      </MenuAnchor>
	    </div>
	  )
	}
}

export default withRouter(MainNav)

MainNav.propTypes = {
  history: PropTypes.object,
}
