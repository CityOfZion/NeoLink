import React from 'react'
import PropTypes from 'prop-types'

import style from './SettingsNavigation.css'

const SettingsNavigation = ({ history }) => (
  <section className={ style.settingsNavigation }>
    <button className={ style.settingsNavigationButton } onClick={ () => history.push('/settings') }>
      <i className='fa fa-arrow-left' />Back
    </button>
  </section>
)

SettingsNavigation.propTypes = {
  history: PropTypes.object.isRequired,
}

export default SettingsNavigation
