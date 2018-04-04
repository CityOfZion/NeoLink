import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Label from '../Label'

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
  disabled = false,
  labelClassNames = '',
  children,
}) => {
  const inputFieldLabelStyles = label ? style.inputFieldLabelStyles : ''
  const errorStyles = error ? style.inputFieldErrorStyles : ''
  const errorElement = error ? <div className={ style.inputFieldErrorMessage }>{error}</div> : ''

  let input

  if (disabled) {
    input = (
      <input
        value={ value }
        disabled={ disabled }
        className={ `${style.inputFieldLabelStyles} ${style.inputField} ${style.inputFieldDisabled}` }
      />
    )
  } else {
    input = (
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
  }

  if (label) {
    return (
      <Label labelText={ label } classNames={ `${style.inputFieldLabel} ${labelClassNames}` }>
        {input}
        {errorElement}
        {children}
      </Label>
    )
  }

  return (
    <Fragment>
      {input}
      {errorElement}
      {children}
    </Fragment>
  )
}

InputField.propTypes = {
  onChangeHandler: PropTypes.func,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  classNames: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  labelClassNames: PropTypes.string,
  children: PropTypes.node,
}

export default InputField
