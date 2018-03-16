import React from 'react'
import PropTypes from 'prop-types'

import style from './Box.css'

const Box = props => <section className={ style.box }>{props.children}</section>

Box.propTypes = {
  children: PropTypes.arrayOf,
}

export default Box
