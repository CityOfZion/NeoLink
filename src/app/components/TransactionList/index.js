import React from 'react'
import PropTypes from 'prop-types'

import TransactionCard from '../TransactionCard'
import SecondaryButton from '../common/buttons/SecondaryButton'
import FlashMessage from '../FlashMessage'

import style from './TransactionList.css'

const TransactionList = ({ transactions, transactionHistoryError, getTransactions }) => {
  const transactionCards = transactions.map(transaction => {
    const amounts = {
      neo: transaction.change.NEO ? Number(transaction.change.NEO) : 0,
      gas: transaction.change.GAS ? Math.abs(Number(transaction.change.GAS)) : 0,
    }

    return (
      <TransactionCard
        key={ transaction.txid }
        transactionId={ transaction.txid }
        neoSent={ amounts.neo > 0 }
        amounts={ amounts }
      />
    )
  })

  let content

  if (transactionHistoryError) {
    content = (
      <div className={ style.transactionHistoryErrorContainer }>
        <FlashMessage flashMessage={ transactionHistoryError } />
        <SecondaryButton
          buttonText='Retry'
          classNames={ style.retryTransactionHistoryButton }
          onClickHandler={ getTransactions }
        />
      </div>
    )
  } else {
    if (transactionCards.length > 0) {
      content = transactionCards
    } else {
      content = <h5 className={ style.transactionListNoTransactions }>No transactions to display.</h5>
    }
  }

  return <section className={ style.transactionList }>{content}</section>
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  transactionHistoryError: PropTypes.string,
  getTransactions: PropTypes.func.isRequired,
}

export default TransactionList
