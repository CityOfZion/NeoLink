import React from 'react'
import PropTypes from 'prop-types'

import style from './FlashMessage.css'

const FlashMessage = ({ flashMessage, classNames }) => (
  <h5 className={ `${style.flashMessage} ${classNames}` }>
    <i className='fas fa-exclamation' />
    {flashMessage}
  </h5>
)

FlashMessage.propTypes = {
  flashMessage: PropTypes.string.isRequired,
  classNames: PropTypes.string,
}

export default FlashMessage
