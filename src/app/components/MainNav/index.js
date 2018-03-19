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
    if (!event.target.className.includes('MainNav')) {
      this.setState(prevState => ({ menuIsOpen: false }))
    }
  }

  pushHistory = event => {
    let path = event.target.dataset.target || event.target.parentNode.dataset.target
    const { history } = this.props

    console.log(path)

    history.push(path)
    this.toggleMenu()
  }

  generateNavigationMarkup = () => {
    return navData.map(navItem => {
      return (
        <button className={ style.mainNavLinkButton } data-target={ navItem.path } key={ navItem.id }>
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
}
