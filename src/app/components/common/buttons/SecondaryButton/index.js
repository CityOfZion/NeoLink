import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

import style from './SecondaryButton.css'

const SecondaryButton = ({ buttonText, icon, classNames, onClickHandler }) => (
  <Button
    buttonText={ buttonText }
    icon={ icon }
    classNames={ `${style.secondaryButton} ${classNames}` }
    onClickHandler={ onClickHandler }
  />
)

SecondaryButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  icon: PropTypes.string,
  classNames: PropTypes.string,
  onClickHandler: PropTypes.func,
}

export default SecondaryButton
