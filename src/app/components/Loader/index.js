import React from 'react'

import style from './Loader.css'

const Loader = () => (
  <section className={ style.loaderWrapper }>
    <h2 className={ style.loaderWrapperHeading }>Preparing to enter the matrix.</h2>
    <div className={ style.loader } />
  </section>
)

export default Loader
