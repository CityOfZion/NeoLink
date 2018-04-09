import React from 'react'
import PropTypes from 'prop-types'

import style from './TransactionCard.css'

import neoPNG from '../../../img/icon-34.png'

const TransactionCard = ({ transactionId, neoSent, amounts }) => {
  const icon = neoSent === true ? <img src={ neoPNG } alt='neo' /> : <i className='fas fa-tint' />
  const amount = neoSent === true ? amounts.neo : amounts.gas
  const amountText = neoSent === true ? 'NEO' : 'GAS'

  return (
    <a
      href={ `https://neotracker.io/tx/${transactionId}` }
      className={ style.transactionCardLink }
      target='_blank'
      rel='noopener'
    >
      <div className={ style.transactionCard }>
        <h4 className={ style.transactionCardHeading }>{transactionId}</h4>
        <p className={ style.transactionCardParagraph }>
          {icon}{' '}
          <span className={ style.transactionCardAmount }>
            {amount} {amountText}
          </span>
        </p>
      </div>
    </a>
  )
}

TransactionCard.propTypes = {
  transactionId: PropTypes.string.isRequired,
  neoSent: PropTypes.bool.isRequired,
  amounts: PropTypes.object.isRequired,
}

export default TransactionCard
