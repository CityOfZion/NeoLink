import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import AccountInfo from '../../components/AccountInfo'
import RenameAccount from '../../components/RenameAccount'
import TransactionList from '../../components/TransactionList'

import style from './Home.css'

const Home = ({
  neo,
  gas,
  label,
  myAccount,
  transactionHistory,
  onClickHandler,
  onSubmitHandler,
  onChangeHandler,
  showInputField,
}) => (
  <Fragment>
    <section className={ style.accountInfoWrapper }>
      <section className={ style.accountInfoContainer }>
        {showInputField ? (
          <RenameAccount accountName={ label } onSubmitHandler={ onSubmitHandler } onChangeHandler={ onChangeHandler } />
        ) : (
          <AccountInfo onClickHandler={ onClickHandler } neo={ neo } gas={ gas } label={ label } address={ myAccount.address } />
        )}
      </section>
    </section>
    <section className={ style.transactionInfo }>
      <h2 className={ style.transactionInfoHeader }>Transactions</h2>
      {transactionHistory && <TransactionList transactions={ transactionHistory } />}
    </section>
  </Fragment>
)

export default Home

Home.propTypes = {
  neo: PropTypes.number,
  gas: PropTypes.number,
  label: PropTypes.string,
  myAccount: PropTypes.object,
  transactionHistory: PropTypes.array,
  onChangeHandler: PropTypes.func,
  onClickHandler: PropTypes.func,
  onSubmitHandler: PropTypes.func,
  showInputField: PropTypes.bool.isRequired,
}
