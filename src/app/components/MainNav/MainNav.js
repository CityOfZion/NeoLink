import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import navData from '../../../data/mainNavigationData'

import bars from '../../../img/bars.svg'
import style from './MainNav.css'

class MainNav extends Component {
  state = {
    menuIsOpen: false,
  }

  componentDidMount() {
    window.addEventListener('click', this.closeDropdownMenu)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeDropdownMenu)
  }

  toggleMenu = event => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  closeDropdownMenu = event => {
    if (event.target && !event.target.className.includes('MainNav')) {
      this.setState({ menuIsOpen: false })
    }
  }

  pushHistory = event => {
    let path = event.target.dataset.target || event.target.parentNode.dataset.target
    const { history } = this.props

    history.push(path)
    this.toggleMenu()
  }

  generateNavigationMarkup = () => {
    return navData.map(navItem => {
      const onClickHandler = navItem.title === 'Log Out' ? this.handleLogOut : null
      return (
        <button
          className={ style.mainNavLinkButton }
          data-target={ navItem.path }
          key={ navItem.id }
          onClick={ onClickHandler }
        >
          <img src={ navItem.img } alt={ navItem.alt } className={ style.mainNavLinkButtonImg } />
          {navItem.title}
        </button>
      )
    })
  }

  getDropdownClasses = () => {
    const { menuIsOpen } = this.state

    let classes
    if (menuIsOpen) {
      classes = `${style.mainNavDropdown} ${style.mainNavDropdownOpen}`
    } else {
      classes = style.mainNavDropdown
    }

    return classes
  }

  handleLogOut = e => {
    const { logOut } = this.props

    e.preventDefault()
    logOut()
  }

  render() {
    const navigationMarkup = this.generateNavigationMarkup()
    const dropdownMenuClasses = this.getDropdownClasses()

    return (
      <nav className={ style.mainNav }>
        <button className={ style.mainNavButton } onClick={ this.toggleMenu }>
          <img src={ bars } alt='three vertical bars' className={ style.mainNavButtonImg } />
        </button>
        <div className={ dropdownMenuClasses } onClick={ this.pushHistory }>
          {navigationMarkup}
        </div>
      </nav>
    )
  }
}

export default withRouter(MainNav)

MainNav.propTypes = {
  history: PropTypes.object,
  logOut: PropTypes.func,
}
