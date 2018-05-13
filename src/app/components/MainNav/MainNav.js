import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import navData from '../../../data/mainNavigationData'
import DropDown from '../../components/DropDown'

import style from './MainNav.css'

class MainNav extends Component {
  pushHistory = path => {
    const { history } = this.props

    history.push(path)
  }

  generateNavigationMarkup = () => {
    return navData.map(navItem => {
      const onClickHandler = navItem.title === 'Log Out' ? this.handleLogOut : () => this.pushHistory(navItem.path)
      return (
        <button className={ style.mainNavLinkButton } key={ navItem.id } onClick={ onClickHandler }>
          <img src={ navItem.img } alt={ navItem.alt } className={ style.mainNavLinkButtonImg } />
          {navItem.title}
        </button>
      )
    })
  }

  handleLogOut = e => {
    const { logOut } = this.props

    e.preventDefault()
    logOut()
  }

  render() {
    const navigationMarkup = this.generateNavigationMarkup()

    return (
      <nav className={ style.mainNav }>
        <DropDown
          buttonContent={ <i className='fas fa-bars' /> }
          buttonStyles={ style.mainNavButton }
          dropDownContent={ navigationMarkup }
          dropDownContentClassNames={ style.mainNavDropDownContent }
        />
      </nav>
    )
  }
}

export default withRouter(MainNav)

MainNav.propTypes = {
  history: PropTypes.object,
  logOut: PropTypes.func,
}
