import React from 'react'
import PropTypes from 'prop-types'

import style from './ImportWalletInfo.css'

const ImportWalletInfo = ({ numWallets }) => {
  return (
    <section className={ style.importWalletInfo }>
      <i className='fas fa-book' />
      <h3 className={ style.importWalletInfoHeading }>
        {numWallets} wallet{numWallets > 1 ? 's' : ''} found. Click the button below to import.
      </h3>
    </section>
  )
}

ImportWalletInfo.propTypes = {
  numWallets: PropTypes.number,
}

export default ImportWalletInfo
