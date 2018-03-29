import React from 'react'

import TransactionCard from '../TransactionCard'
import style from './TransactionList.css'

const TransactionList = ({ transactions }) => {
  const transactionCards = transactions.map(transaction => {
    const amounts = { neo: transaction.NEO, gas: transaction.GAS }
    console.log(amounts)
    return <TransactionCard transactionId={ transaction.txid } type={ transaction.neo_sent } amounts={ amounts } />
  })

  return <section className={ style.transactionList }>{transactionCards}</section>
}

export default TransactionList
