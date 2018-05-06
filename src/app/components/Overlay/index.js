import React from 'react'
import PropTypes from 'prop-types'

import style from './Overlay.css'

const Overlay = ({ children }) => <section className={ style.overlay }>{children}</section>

Overlay.propTypes = {
  children: PropTypes.object,
}

export default Overlay
