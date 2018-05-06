import React, { Component } from 'react'

import style from './DropDown.css'

class DropDown extends Component {
  state = {
    showDropDown: false,
  }

  showDropDown = () => this.setState(prevState => ({ showDropDown: !prevState.showDropDown }))

  generateDropDownLinks = data => {
    const { dropdownData } = this.props

    return dropdownData.map(data => {
      return (
        <a className={ style.dropDownLink } href={ data.link } key={ data.link }>
          {data.icon ? data.icon : ''} {data.name}
        </a>
      )
    })
  }

  render() {
    const { buttonContent, buttonStyles } = this.props
    const { showDropDown } = this.state
    const dropDownStyles = showDropDown ? `${style.dropDown} ${style.showDropDown}` : style.dropDown

    return (
      <section className={ style.dropDownContainer }>
        <button className={ `${style.dropDownButton} ${buttonStyles}` }>{buttonContent}</button>
        <div className={ style.dropDown }>{this.generateDropDownLinks()}</div>
      </section>
    )
  }
}

export default DropDown
