import React from 'react'
import PropTypes from 'prop-types'

import style from './Box.css'

const Box = ({ children, classNames }) => <section className={ `${style.box} ${classNames}` }>{children}</section>

Box.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
}

export default Box
