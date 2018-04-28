import React from 'react'

import style from './SettingsButton.css'

const SettingsButton = ({ icon, text, onClickHandler }) => (
  <button className={ style.settingsButton } onClick={ onClickHandler }>
    <i className={ icon } />
    {text}
  </button>
)

export default SettingsButton
