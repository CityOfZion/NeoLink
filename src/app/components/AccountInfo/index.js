import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FlashMessage from '../FlashMessage'
import PrimaryButton from '../common/buttons/PrimaryButton'

import neonPNG from '../../../img/icon-34.png'

import style from './AccountInfo.css'

const AccountInfo = ({
  label,
  onClickHandler,
  neo,
  gas,
  address,
  amountsError,
  getBalance,
  showDropDown,
  toggleDropDownMenu,
  showOptions,
}) => {
  let dropDownClasses = showDropDown
    ? `${style.accountInfoDropDown} ${style.accountInfoDropDownActive}`
    : style.accountInfoDropDown

  let accountDetailsClasses = showOptions ? style.accountInfo : style.accountInfoNoOptions
  return (
    <Fragment>
      <div className={ accountDetailsClasses }>
        <div className={ style.accountInfoImageContainer }>
          <img src={ neonPNG } alt='Neo' />
        </div>
        <div className={ style.accountInfoDetails }>
          <h2 className={ style.accountInfoDetailsHeading }>{label}</h2>
          <p className={ style.accountInfoDetailsParagraph }>{address}</p>
        </div>
        {showOptions && (
          <div className={ style.accountInfoDropDownContainer }>
            <button className={ style.accountDropDownButton } onClick={ toggleDropDownMenu }>
              <i className='fa fa-ellipsis-v' />
            </button>
            <div className={ dropDownClasses }>
              <ul className={ style.accountInfoDropDownList }>
                <li className={ style.accountInfoDropDownListItem }>
                  <Link to='/send' className={ style.dropDownLinks }>
                    <i className='fas fa-paper-plane' />Send
                  </Link>
                </li>
                <li className={ style.accountInfoDropDownListItem }>
                  <Link to={ `https://neoscan.io/address/${address}` } target='_blank' className={ style.dropDownLinks }>
                    <i className='fas fa-eye' />View on Neoscan
                  </Link>
                </li>
                <li className={ style.accountInfoDropDownListItem }>
                  <button className={ style.dropDownLinksButton } onClick={ onClickHandler }>
                    <i className='fas fa-pencil-alt' />Rename
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {amountsError ? (
        <div>
          <FlashMessage flashMessage={ amountsError } />
          <PrimaryButton buttonText='Retry' classNames={ style.accountInfoErrorButton } onClickHandler={ getBalance } />
        </div>
      ) : (
        <div className={ style.accountInfoAmounts }>
          <div className={ style.accountInfoNeoAmount }>
            <img src={ neonPNG } alt='Neo' className={ style.accountInfoNeoAmountImg } />
            <p className={ style.accountInfoAmountParagraph }>{neo} NEO</p>
          </div>
          <button className={ style.accountInfoRefreshButton } onClick={ getBalance }>
            <i className='fas fa-sync' />
          </button>
          <div className={ style.accountInfoGasAmount }>
            <i className='fas fa-tint' />
            <p className={ style.accountInfoAmountParagraph }>{gas > 0 ? gas : 0} GAS</p>
          </div>
        </div>
      )}
    </Fragment>
  )
}

AccountInfo.propTypes = {
  label: PropTypes.string.isRequired,
  showOptions: PropTypes.bool,
  onClickHandler: PropTypes.func,
  getBalance: PropTypes.func,
  neo: PropTypes.number,
  gas: PropTypes.number,
  address: PropTypes.string.isRequired,
  amountsError: PropTypes.string,
  showDropDown: PropTypes.bool,
  toggleDropDownMenu: PropTypes.func,
}

export default AccountInfo
