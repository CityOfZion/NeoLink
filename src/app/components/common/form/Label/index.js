import React from 'react'
import PropTypes from 'prop-types'

const Label = ({ classNames, labelText, children, reversed }) => {
  if (reversed) {
    return (
      <label className={ classNames }>
        {children}
        {labelText}
      </label>
    )
  }
  return (
    <label className={ classNames }>
      {labelText}
      {children}
    </label>
  )
}

Label.propTypes = {
  classNames: PropTypes.string,
  labelText: PropTypes.string,
  children: PropTypes.node,
  reversed: PropTypes.bool,
}

export default Label
