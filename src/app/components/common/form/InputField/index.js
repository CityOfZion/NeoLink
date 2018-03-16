import React from 'react'
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
}) => {
  const inputFieldLabelStyles = label ? style.inputFieldLabelStyles : ''

  const input = (
    <input
      name={ name }
      value={ value }
      onChange={ onChangeHandler }
      className={ `${style.inputField} ${classNames} ${inputFieldLabelStyles}` }
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
      </label>
    )
  }

  return input
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
}

export default InputField
