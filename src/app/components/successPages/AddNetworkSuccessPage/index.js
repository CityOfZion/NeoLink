import React from 'react'
import PropTypes from 'prop-types'

import SuccessPage from '../SuccessPage'
import SecondaryButton from '../../common/buttons/SecondaryButton'

import style from './AddNetworkSuccessPage.css'

const AddNetworkSuccess = ({ history }) => (
  <SuccessPage title={ 'Network Added' } classNames={ style.addNetworkSuccessPage }>
    <SecondaryButton buttonText='Back to home' onClickHandler={ () => history.push('/home') } />
  </SuccessPage>
)

AddNetworkSuccess.propTypes = {
  history: PropTypes.object,
}

export default AddNetworkSuccess
