import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

import style from './secondaryButton.css'

const SecondaryButton = ({ buttonText, icon, classNames }) => (
  <Button buttonText={ buttonText } icon={ icon } classNames={ `${style.secondaryButton} ${classNames}` } />
)

SecondaryButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  icon: PropTypes.string,
  classNames: PropTypes.string,
}

export default SecondaryButton
