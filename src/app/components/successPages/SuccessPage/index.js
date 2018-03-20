import React from 'react'
import PropTypes from 'prop-types'

import style from './SuccessPage.css'

const SuccessPage = props => (
  <section className={ style.successPage }>
    <div className={ style.successPageIconContainer }>
      <i className='fas fa-check' />
    </div>
    <h2 className={ style.successPageHeading }>{props.title}</h2>
    {props.children}
  </section>
)

SuccessPage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default SuccessPage
