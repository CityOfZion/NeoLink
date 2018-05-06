import React from 'react'
import PropTypes from 'prop-types'
import Box from '../../components/common/Box'

import style from './ConfirmDelete.css'

const ConfirmDelete = ({ onClickAcceptHandler, onClickRejectHandler, item }) => (
  <section className={ style.confirmDeleteCard }>
    <Box classNames={ style.confirmDeleteBox }>
      <div className={ style.confirmDeleteBoxContainer }>
        <i className='fas fa-exclamation' />
        <h3 className={ style.confirmDeleteHeading }>You are about to delete:</h3>
        <h3 className={ style.confirmDeleteItem }>{item}</h3>
        <h3 className={ style.confirmDeleteSecondHeading }>This action can not be undone.</h3>
        <h3 className={ style.confirmDeleteThirdHeading }>Are you certain?</h3>
      </div>
      <div className={ style.confirmDeleteButtons }>
        <button onClick={ onClickRejectHandler } className={ `${style.confirmDeleteButton} ${style.confirmDeleteReject}` }>
          Take me back.
        </button>
        <button onClick={ onClickAcceptHandler } className={ `${style.confirmDeleteButton} ${style.confirmDeleteAccept}` }>
          Yes, delete.
        </button>
      </div>
    </Box>
  </section>
)

ConfirmDelete.propTypes = {
  onClickAcceptHandler: PropTypes.func.isRequired,
  onClickRejectHandler: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
}

export default ConfirmDelete
