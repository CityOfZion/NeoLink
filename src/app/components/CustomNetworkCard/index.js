import React from 'react'
import PropTypes from 'prop-types'

import DropDown from '../DropDown'

import style from './CustomNetworkCard.css'

const CustomNetworkCard = ({ name, url, dropDownContent }) => (
  <section className={ style.customNetworkCard } key={ name }>
    <div className={ style.customNetworkColorContainer }>
      <div className={ style.customNetworkColor } />
    </div>
    <div className={ style.customNetworkContainer }>
      <h3>{name}</h3>
      <h3 className={ style.customNetworkUrl }>{url}</h3>
    </div>
    <DropDown
      buttonContent={ <i className='fas fa-ellipsis-v' /> }
      buttonStyles={ style.customNetworkDropdownButton }
      dropDownContent={ dropDownContent }
      classNames={ style.customNetworkDropDown }
    />
  </section>
)

CustomNetworkCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  dropDownContent: PropTypes.object.isRequired,
}

export default CustomNetworkCard
