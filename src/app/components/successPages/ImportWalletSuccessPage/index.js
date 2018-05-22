import React from 'react'
import PropTypes from 'prop-types'

import SuccessPage from '../SuccessPage'
import SecondaryButton from '../../common/buttons/SecondaryButton'

import style from './ImportWalletSuccessPage.css'

const ImportWalletSuccessPage = ({ history, title }) => (
  <SuccessPage title={ title } classNames={ style.importWalletSuccessPage }>
    <SecondaryButton buttonText='Back to home' onClickHandler={ () => history.push('/home') } />
  </SuccessPage>
)

ImportWalletSuccessPage.propTypes = {
  history: PropTypes.object,
  title: PropTypes.string,
}

export default ImportWalletSuccessPage
