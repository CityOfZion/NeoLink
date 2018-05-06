import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './DropDown.css'

class DropDown extends Component {
  state = {
    showDropDown: false,
  }

  componentDidMount() {
    window.addEventListener('click', this._closeDropDownMenu)
  }

  comoponentWillUnmount() {
    window.removeEventListener('click', this._closeDropDownMenu)
  }

  toggleDropDown = () => this.setState(prevState => ({ showDropDown: !prevState.showDropDown }))

  _closeDropDownMenu = event => {
    if (event.target && !event.target.className.includes('dropDown')) {
      this.setState({ showDropDown: false })
    }
  }

  render() {
    const { buttonContent, buttonStyles, classNames, dropDownContent } = this.props
    const { showDropDown } = this.state
    const dropDownStyles = showDropDown ? `${style.dropDown} ${style.showDropDown}` : style.dropDown

    return (
      <section className={ `${style.dropDownContainer} ${classNames}` }>
        <button className={ `${style.dropDownButton} ${buttonStyles}` } onClick={ this.toggleDropDown }>
          {buttonContent}
        </button>
        <div className={ dropDownStyles }>{dropDownContent}</div>
      </section>
    )
  }
}

DropDown.propTypes = {
  buttonContent: PropTypes.object.isRequired,
  buttonStyles: PropTypes.string,
  classNames: PropTypes.string,
  dropDownContent: PropTypes.object,
}

export default DropDown
