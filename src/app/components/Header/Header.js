import React from 'react'
import PropTypes from 'prop-types'
import { getNavigation } from './helpers'

import NetworkSwitcher from '../NetworkSwitcher'

import style from './Header.css'

const Header = props => {
  const { setNetwork, selectedNetworkId, networks } = props
  const navigation = getNavigation(props)

  return (
    <div className={ style.header }>
      <div className={ style.menuNavWrapper }>{navigation}</div>
      <div className={ style.headerTitle }>
        <h1>NeoLink</h1>
      </div>
      <NetworkSwitcher setNetwork={ setNetwork } selectedNetworkId={ selectedNetworkId } networks={ networks } />
    </div>
  )
}

Header.propTypes = {
  selectedNetworkId: PropTypes.string,
  setNetwork: PropTypes.func,
  networks: PropTypes.object,
}

export default Header
