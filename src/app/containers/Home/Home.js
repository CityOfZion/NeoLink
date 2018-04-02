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
  address,
  transactionHistory,
  onClickHandler,
  onSubmitHandler,
  onChangeHandler,
  showInputField,
  amountsError,
  transactionHistoryError,
  getBalance,
  getTransactions,
  labelError,
  showDropDown,
  toggleDropDownMenu,
}) => (
  <Fragment>
    <section className={ style.accountInfoWrapper }>
      <section className={ style.accountInfoContainer }>
        {showInputField ? (
          <RenameAccount
            accountName={ label }
            onSubmitHandler={ onSubmitHandler }
            onChangeHandler={ onChangeHandler }
            labelError={ labelError }
          />
        ) : (
          <AccountInfo
            onClickHandler={ onClickHandler }
            neo={ neo }
            gas={ gas }
            label={ label }
            address={ address }
            amountsError={ amountsError }
            getBalance={ getBalance }
            toggleDropDownMenu={ toggleDropDownMenu }
            showDropDown={ showDropDown }
          />
        )}
      </section>
    </section>
    <section className={ style.transactionInfo }>
      <h2 className={ style.transactionInfoHeader }>Transactions</h2>
      <TransactionList
        transactions={ transactionHistory }
        transactionHistoryError={ transactionHistoryError }
        getTransactions={ getTransactions }
      />
    </section>
  </Fragment>
)

export default Home

Home.propTypes = {
  neo: PropTypes.string,
  gas: PropTypes.string,
  label: PropTypes.string,
  address: PropTypes.string,
  transactionHistory: PropTypes.array,
  onChangeHandler: PropTypes.func,
  onClickHandler: PropTypes.func,
  onSubmitHandler: PropTypes.func,
  showInputField: PropTypes.bool.isRequired,
  amountsError: PropTypes.string,
  transactionHistoryError: PropTypes.string,
  getBalance: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  labelError: PropTypes.string,
  showDropDown: PropTypes.bool,
  toggleDropDownMenu: PropTypes.func,
}
