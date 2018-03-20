import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Label from '../Label'

import style from './CheckBox.css'

class CheckBox extends Component {
  constructor() {
    super()

    this.state = {
      checked: false,
    }
  }

  handleClick = e => {
    e.stopPropagation()
    this.setState(prevState => ({ checked: !prevState.checked }))
    this.props.onClickHandler()
  }

  render() {
    const { label } = this.props
    const checkMark = this.state.checked ? (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
        <path
          fill='#585858'
          d='M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z'
        />
      </svg>
    ) : (
      ''
    )

    const button = (
      <button className={ style.checkBox } onClick={ this.handleClick }>
        {checkMark}
      </button>
    )

    if (label) {
      return (
        <Label labelText={ label } classNames={ style.checkBoxLabel } reversed>
          {button}
        </Label>
      )
    }

    return button
  }
}

CheckBox.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  label: PropTypes.string,
}

export default CheckBox
