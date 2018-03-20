import React, { Component } from 'react'
import checkSVG from '../../../../../img/check.svg'
import PropTypes from 'prop-types'

import style from './CheckBox.css'

class CheckBox extends Component {
  constructor() {
    super()

    this.state = {
      checked: false,
    }
  }

  handleClick = () => {
    this.setState(prevState => ({ checked: !prevState.checked }))
    this.props.onClickHandler()
  }

  render() {
    const { labelText } = this.props
    const checkMark = this.state.checked ? checkSVG : ''

    const button = (
      <button className={ style.checkBox } onClick={ this.handleClick }>
        {checkMark}
      </button>
    )

    if (labelText) {
      return (
        <label className={ style.checkBoxLabel }>
          {button}
          {labelText}
        </label>
      )
    }

    return button
  }
}

CheckBox.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  labelText: PropTypes.string,
}

export default CheckBox
