import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import neonPNG from '../../../img/icon-34.png'

import style from './AccountInfo.css'

const AccountInfo = ({ label, onClickHandler, neo, gas, address }) => (
  <Fragment>
    <div className={ style.accountInfo }>
      <div className={ style.accountInfoImageContainer }>
        <img src={ neonPNG } alt='Neo' />
      </div>
      <div className={ style.accountInfoDetails }>
        <h2 className={ style.accountInfoDetailsHeading }>
          {label}
          <button className={ style.accountInfoDetailsHeadingButton } onClick={ onClickHandler }>
            <i className='fas fa-pencil-alt' />
          </button>
        </h2>
        <p className={ style.accountInfoDetailsParagraph }>{address}</p>
      </div>
      <button className={ style.accountActionsButton }>
        <i className='fa fa-ellipsis-v' />
      </button>
    </div>

    <div className={ style.accountInfoAmounts }>
      <div className={ style.accountInfoNeoAmount }>
        <img src={ neonPNG } alt='Neo' className={ style.accountInfoNeoAmountImg } />
        <p className={ style.accountInfoAmountParagraph }>{neo} NEO</p>
      </div>
      <div className={ style.accountInfoGasAmount }>
        <i className='fas fa-tint' />
        <p className={ style.accountInfoAmountParagraph }>{gas > 0 ? gas : 0} GAS</p>
      </div>
    </div>
  </Fragment>
)

AccountInfo.propTypes = {
  label: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func,
  neo: PropTypes.number,
  gas: PropTypes.number,
  address: PropTypes.string.isRequired,
}

export default AccountInfo
