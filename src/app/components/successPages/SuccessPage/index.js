import React from 'react'
import PropTypes from 'prop-types'

import style from './SuccessPage.css'

const SuccessPage = ({ title, children, classNames }) => (
  <section className={ `${style.successPage} ${classNames}` }>
    <div className={ style.successPageIconContainer }>
      <i className='fas fa-check' />
    </div>
    <h2 className={ style.successPageHeading }>{title}</h2>
    {children}
  </section>
)

SuccessPage.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  classNames: PropTypes.string,
}

export default SuccessPage
