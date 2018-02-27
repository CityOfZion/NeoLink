import React, { Component } from 'react'
import PropTypes from 'prop-types'

import globe from '../../../img/globe.svg'
import chevron from '../../../img/chevron-down.svg';

import style from './NetworkSwitcher.css'

class NetworkSwitcher extends Component {
  change = (event) => {
    const { setNetwork } = this.props
    setNetwork(event.target.value)
  }

  generateNetworkOptions(networks) {
    const networkOptions = []

    Object.keys(networks).forEach((index) => {
      networkOptions.push((
        <option key={ `option-key-${index}` } value={ index }>{ networks[index].name }</option>
      ))
    })
    return networkOptions
  }

  render () {
    const { selectedNetworkId, networks } = this.props

    const networkOptions = this.generateNetworkOptions(networks)

    return (
      <button className={ style.networkNavigationButton }>
        <img src={ globe } className={ style.networkNavigationGlobe } alt='globe' />
        <img src={ chevron } className={ style.networkNavigationChevron } alt='chevron down' />
      </button>
      // <div>
      //   <select className={ style.switcher } defaultValue={ selectedNetworkId } onChange={ this.change }>
      //     { networkOptions }
      //   </select>
      // </div>
    )
  }
}

NetworkSwitcher.propTypes = {
  selectedNetworkId: PropTypes.string,
  setNetwork: PropTypes.func,
  networks: PropTypes.object,
}

export default NetworkSwitcher
