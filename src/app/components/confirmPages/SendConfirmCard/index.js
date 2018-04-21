import React from 'react'
import PropTypes from 'prop-types'

import style from './SendConfirmCard.css'

const SendConfirmCard = ({ assetType, amount, address, succesClickHandler, rejectClickHandler }) => (
  <section className={ style.confirmSendCard }>
    <div className={ style.confirmSendCardContainer }>
      <i className={ `${style.confirmSendCardMainIcon} far fa-paper-plane` } />
      <h2 className={ style.confirmSendHeader }>You are about to send</h2>
      <h3>
        {amount} {assetType}
      </h3>
      <h4 className={ style.confirmSendCardDetailsHeading }>Details</h4>
      <section className={ style.confirmSendCardDetails }>
        <i className={ `${style.confirmSendSecondaryIcon} far fa-paper-plane` } />
        <p className={ style.confirmSendDetailsText }>
          You are about to send {amount} {assetType} to the following address
        </p>
      </section>
      <div className={ style.confirmSendCardAddress }>{address}</div>
    </div>
    <section className={ style.confirmSendButtons }>
      <button
        className={ `${style.confirmSendCardRejectButton} ${style.confirmSendButton}` }
        onClick={ rejectClickHandler }
      >
        Reject
      </button>
      <button
        className={ `${style.confirmSendCardAcceptButton} ${style.confirmSendButton}` }
        onClick={ succesClickHandler }
      >
        Accept
      </button>
    </section>
  </section>
)

SendConfirmCard.propTypes = {
  assetType: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  succesClickHandler: PropTypes.func.isRequired,
  rejectClickHandler: PropTypes.func.isRequired,
}

export default SendConfirmCard
