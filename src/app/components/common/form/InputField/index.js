import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import style from './InputField.css'

const InputField = ({
  name = '',
  value,
  onChangeHandler,
  classNames = '',
  type = 'text',
  placeholder = '',
  id = '',
  label = '',
  error = '',
}) => {
  const inputFieldLabelStyles = label ? style.inputFieldLabelStyles : ''
  const errorStyles = error ? style.inputFieldErrorStyles : ''
  const errorElement = error ? <div className={ style.inputFieldErrorMessage }>{error}</div> : ''

  const input = (
    <input
      name={ name }
      value={ value }
      onChange={ onChangeHandler }
      className={ `${style.inputField} ${classNames} ${inputFieldLabelStyles} ${errorStyles}` }
      type={ type }
      id={ id }
      placeholder={ placeholder }
    />
  )

  if (label) {
    return (
      <label className={ style.inputFieldLabel }>
        {label}
        {input}
        {errorElement}
      </label>
    )
  }

  return (
    <Fragment>
      {input}
      {errorElement}
    </Fragment>
  )
}

InputField.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  classNames: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
}

export default InputField
