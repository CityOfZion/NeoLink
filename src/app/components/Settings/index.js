import React from 'react'
import PropTypes from 'prop-types'

import SettingsButton from '../../components/SettingsButton'

import style from './Settings.css'

const Settings = props => (
  <section className={ style.settings }>
    <div className={ style.settingsContainer }>
      <h1 className={ style.settingsHeader }>Settings</h1>
      <div className={ style.settingsButtonContainer }>
        <SettingsButton
          icon='fas fa-upload'
          text='Import Wallet'
          onClickHandler={ () => props.history.push('/settings') }
        />
        <SettingsButton
          icon='fas fa-download'
          text='Export Wallet'
          onClickHandler={ () => props.history.push('/settings') }
        />
        <SettingsButton
          icon='fas fa-plus-circle'
          text='Add Network'
          onClickHandler={ () => props.history.push('/config') }
        />
        <SettingsButton
          icon='fas fa-cogs'
          text='Manage Networks'
          onClickHandler={ () => props.history.push('/settings') }
        />
      </div>
    </div>
  </section>
)

Settings.propTypes = {
  history: PropTypes.object,
}

export default Settings
