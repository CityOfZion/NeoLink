import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import style from './AccountInfoDropDownContent.css'

const AccountInfoDropDownContent = ({ onClickHandler, address }) => {
  return (
    <Fragment>
      <Link to='/send' className={ style.dropDownLinks }>
        <i className='fas fa-paper-plane' />Send
      </Link>

      <Link to={ `https://neoscan.io/address/${address}` } target='_blank' className={ style.dropDownLinks }>
        <i className='fas fa-eye' />View on Neoscan
      </Link>
      <button className={ style.dropDownLinksButton } onClick={ onClickHandler }>
        <i className='fas fa-edit' />Edit Name
      </button>
    </Fragment>
  )
}

AccountInfoDropDownContent.propTypes = {
  onClickHandler: PropTypes.func,
  address: PropTypes.string.isRequired,
}

export default AccountInfoDropDownContent
