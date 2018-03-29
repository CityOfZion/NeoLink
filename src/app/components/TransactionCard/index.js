import React from 'react'

import style from './TransactionCard.css'

import neoPNG from '../../../img/icon-34.png'

const TransactionCard = ({ transactionId, type, amounts }) => {
  console.log(type)
  const icon = type === true ? <img src={ neoPNG } alt='neo' /> : <i className='fas fa-tint' />
  const amount = type === true ? amounts.neo : amounts.gas
  const amountText = type === true ? 'NEO' : 'GAS'

  return (
    <div className={ style.transactionCard }>
      <h4 className={ style.transactionCardHeading }>{transactionId}</h4>
      <p className={ style.transactionCardParagraph }>
        {icon}{' '}
        <span className={ style.transactionCardAmount }>
          {amount} {amountText}
        </span>
      </p>
    </div>
  )
}
export default TransactionCard
