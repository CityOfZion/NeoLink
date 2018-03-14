import React from 'react'
import PropTypes from 'prop-types'

import style from './Startpage.css'

const Startpage = ({ history }) => {
  return (
    <section className={ style.startpage }>
      <button className={ style.startpageButton } onClick={ () => history.push('/createWallet') }>
        <i className={ `${style.startpageIcon} fas fa-plus` } />
        New Wallet
      </button>
      <button className={ style.startpageButton } onClick={ () => history.push('/login') }>
        <i className={ `${style.startpageIcon} fas fa-sign-in-alt` } />
        Use Saved Wallet
      </button>
      <button className={ style.startpageButton } onClick={ () => history.push('/newAccountFromWIF') }>
        <i className={ `${style.startpageIcon} fas fa-sign-in-alt` } />
        Use WIF
      </button>
    </section>
  )
}

Startpage.propTypes = {
  history: PropTypes.object,
}

export default Startpage
