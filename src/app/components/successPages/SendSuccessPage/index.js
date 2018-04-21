import React from 'react'
import PropTypes from 'prop-types'

import SuccessPage from '../SuccessPage'
import SecondaryButton from '../../common/buttons/SecondaryButton'

import style from './SendSuccessPage.css'

const SendSuccessPage = ({ txid, title }) => (
  <SuccessPage title={ title }>
    <p className={ style.sendSuccessPageText }>You can verify the transaction at the following transactionid</p>
    <a href={ `https://neoscan.io/transaction/${txid}` } className={ style.transactionLink } target='_blank'>
      {txid}
    </a>
    <SecondaryButton buttonText='Back to home' />
  </SuccessPage>
)

SendSuccessPage.propTypes = {
  txid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default SendSuccessPage
