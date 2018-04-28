import React from 'react'

import style from './SettingsButton.css'

const SettingsButton = ({ icon, text, onClickHandler }) => (
  <button className={ style.SettingsButton } onClick={ onClickHandler }>
    {icon}
    {text}
  </button>
)

export default SettingsButton
