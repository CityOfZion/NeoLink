import React from 'react'
import PropTypes from 'prop-types'

import TransactionCard from '../TransactionCard'
import style from './TransactionList.css'

const TransactionList = ({ transactions }) => {
  const transactionCards = transactions.map(transaction => {
    const amounts = { neo: transaction.NEO, gas: transaction.GAS }
    return <TransactionCard transactionId={ transaction.txid } neoSent={ transaction.neo_sent } amounts={ amounts } />
  })

  return <section className={ style.transactionList }>{transactionCards}</section>
}

TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
}

export default TransactionList
