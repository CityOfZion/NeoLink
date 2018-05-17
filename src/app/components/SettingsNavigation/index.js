import React from 'react'
import PropTypes from 'prop-types'

import style from './SettingsNavigation.css'

const SettingsNavigation = ({ history, path = '/settings' }) => (
  <section className={ style.settingsNavigation }>
    <button className={ style.settingsNavigationButton } onClick={ () => history.push(path) }>
      <i className='fa fa-arrow-left' />Back
    </button>
  </section>
)

SettingsNavigation.propTypes = {
  history: PropTypes.object.isRequired,
  path: PropTypes.string,
}

export default SettingsNavigation
