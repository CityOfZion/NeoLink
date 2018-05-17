import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

import style from './PrimaryButton.css'

const PrimaryButton = ({ buttonText, icon, classNames, onClickHandler }) => (
  <Button
    buttonText={ buttonText }
    icon={ icon }
    classNames={ `${style.primaryButton} ${classNames}` }
    onClickHandler={ onClickHandler }
  />
)

PrimaryButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  icon: PropTypes.string,
  classNames: PropTypes.string,
  onClickHandler: PropTypes.func,
}

export default PrimaryButton
