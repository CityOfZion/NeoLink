import React from 'react'
import PropTypes from 'prop-types'

import style from './ErrorCard.css'

const ErrorCard = ({ onClickHandler, message, classNames }) => (
  <div className={ `${style.errorCard} ${classNames}` }>
    <i className={ `${style.errorCardIcon} fas fa-exclamation-triangle` } />
    <p className={ style.errorCardText }>{message}</p>
    <button className={ style.errorCardCloseButton } onClick={ onClickHandler }>
      <i className='fas fa-times' />
    </button>
  </div>
)

ErrorCard.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  classNames: PropTypes.classNames,
}

export default ErrorCard
