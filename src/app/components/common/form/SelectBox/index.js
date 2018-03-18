import React from 'react'
import PropTypes from 'prop-types'

import style from './SelectBox.css'

const SelectBox = ({ options, classNames = '', name = '', id = '', label = '', value = '', onChangeHandler }) => {
  const selectBoxLabeLStyles = label ? style.selectBoxLabelStyles : ''
  const formattedOptions = options.map(option => (
    <option key={ option.value } value={ option.value }>
      {option.label}
    </option>
  ))

  const selectBox = (
    <select
      className={ `${style.selectBox} ${classNames} ${selectBoxLabeLStyles}` }
      name={ name }
      id={ id }
      onChange={ onChangeHandler }
    >
      {formattedOptions}
    </select>
  )

  if (label) {
    return (
      <label className={ style.selectBoxLabel }>
        {label}
        {selectBox}
      </label>
    )
  }

  return selectBox
}

SelectBox.propTypes = {
  options: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
}

export default SelectBox
