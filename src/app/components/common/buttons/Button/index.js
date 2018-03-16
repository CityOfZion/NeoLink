import React from 'react'
import PropTypes from 'prop-types'

import style from './Button.css'

const Button = ({ buttonText, icon, classNames }) => {
  const buttonIcon = icon ? <img src={ icon } className={ style.buttonIcon } alt='' /> : ''
  return (
    <button className={ `${style.button} ${classNames}` }>
      {buttonIcon}
      {buttonText}
    </button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  icon: PropTypes.string,
  classNames: PropTypes.string,
}

export default Button
