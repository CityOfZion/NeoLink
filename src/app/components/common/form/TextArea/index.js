import React from 'react'
import PropTypes from 'prop-types'

import Label from '../Label'

import style from './TextArea.css'

const TextArea = ({ classNames, value, disabled, label, labelClassNames = '', children }) => {
  const textFieldLabelStyles = label ? style.textFieldLabelStyles : ''

  let textArea
  if (disabled) {
    textArea = (
      <textarea
        className={ `${style.textArea} ${textFieldLabelStyles} ${classNames} ${style.textAreaDisabled}` }
        disabled
      >
        {value}
      </textarea>
    )
  } else {
    textArea = (
      <textarea className={ `${style.textArea} ${textFieldLabelStyles} ${classNames} ${style.textAreaDisabled}` }>
        {value}
        {children}
      </textarea>
    )
  }

  if (label) {
    return (
      <Label classNames={ `${style.textAreaLabel} ${labelClassNames}` } labelText={ label }>
        {textArea}
        {children}
      </Label>
    )
  }

  return textArea
}

TextArea.propTypes = {
  classNames: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelClassNames: PropTypes.string,
  children: PropTypes.arrayOf,
}

export default TextArea
