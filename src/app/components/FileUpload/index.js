import React from 'react'
import PropTypes from 'prop-types'

import style from './FileUpload.css'

const FileUpload = ({ onChangeHandler }) => {
  return (
    <label className={ style.fileUpload }>
      <i className='fas fa-download' />
      <input type='file' id='file' onChange={ onChangeHandler } className={ style.fileUploadInput } />
    </label>
  )
}

FileUpload.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
}

export default FileUpload
