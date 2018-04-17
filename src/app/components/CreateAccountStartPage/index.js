import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import style from '../../components/StartPage/StartPage.css'

const CreateAccountStartPage = ({ history }) => {
  return (
    <section className={ `${style.startPage} ${style.startPageCreateAccount}` }>
      <button className={ style.startPageButton } onClick={ () => history.push('/createWallet') }>
        <i className={ `${style.startPageIcon} fas fa-plus` } />
        Create New Wallet
      </button>
      <button className={ style.startPageButton } onClick={ () => history.push('/newAccountFromEncryptedKey') }>
        <i className={ `${style.startPageIcon} fas fa-plus` } />
        Use Encrypted Key
      </button>
      <button className={ style.startPageButton } onClick={ () => history.push('/newAccountFromWIF') }>
        <i className={ `${style.startPageIcon} fas fas fa-plus` } />
        Use Wif
      </button>
    </section>
  )
}

CreateAccountStartPage.propTypes = {
  history: PropTypes.object,
}

export default withRouter(CreateAccountStartPage)
