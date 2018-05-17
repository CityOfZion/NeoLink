import React from 'react'
import PropTypes from 'prop-types'

import SuccessPage from '../SuccessPage'
import SecondaryButton from '../../common/buttons/SecondaryButton'

import style from './NetworkSuccessPage.css'

const NetworkSuccessPage = ({ history, title }) => (
  <SuccessPage title={ title } classNames={ style.networkSuccessPage }>
    <SecondaryButton buttonText='Back to home' onClickHandler={ () => history.push('/home') } />
  </SuccessPage>
)

NetworkSuccessPage.propTypes = {
  history: PropTypes.object,
  title: PropTypes.string,
}

export default NetworkSuccessPage
