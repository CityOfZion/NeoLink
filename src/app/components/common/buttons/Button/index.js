import React from 'react'
import PropTypes from 'prop-types'

import style from './Button.css'

const Button = ({ buttonText, icon, classNames, onClickHandler }) => {
  const buttonIcon = icon ? <img src={ icon } className={ style.buttonIcon } alt='' /> : ''
  return (
    <button className={ `${style.button} ${classNames}` } onChange={ onClickHandler }>
      {buttonIcon}
      {buttonText}
    </button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  icon: PropTypes.string,
  classNames: PropTypes.string,
  onClickHandler: PropTypes.func,
}

export default Button
