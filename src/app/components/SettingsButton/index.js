import React from 'react'
import PropTypes from 'prop-types'

import style from './SettingsButton.css'

const SettingsButton = ({ icon, text, onClickHandler }) => (
  <button className={ style.settingsButton } onClick={ onClickHandler }>
    <i className={ icon } />
    {text}
  </button>
)

SettingsButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
}

export default SettingsButton
