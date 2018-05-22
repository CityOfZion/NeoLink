import React from 'react'
import PropTypes from 'prop-types'

const FileUpload = ({ onClickHandler }) => {
  return <input type='file' id='file' onChange={ this.handleFileUpload } />
}

FileUpload.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
}

export default FileUpload
