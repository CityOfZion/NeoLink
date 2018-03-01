import React, { Component } from 'react'
import PropTypes from 'prop-types'

import globe from '../../../img/globe.svg'
import chevron from '../../../img/chevron-down.svg'

import style from './NetworkSwitcher.css'

import neoImg from '../../../img/icon-34.png'
import flask from '../../../img/flask.svg'
// import network from '../../reducers/account'

class NetworkSwitcher extends Component {
  state = {
    networkMenuOpen: false,
  }

  changeNetwork = event => {
    const { setNetwork } = this.props
    const dataset = event.target.dataset.value

    console.log(dataset)

    if (dataset) {
      setNetwork(dataset)
      this.closeDropdownMenu()
    }
  }

  toggleDropdownMenu = () => {
    this.setState({ networkMenuOpen: !this.state.networkMenuOpen })
  }

  closeDropdownMenu = () => {
    this.setState({ networkMenuOpen: false })
  }

  getIndicator = (networks, index) => {
    let indicator
    const networkName = networks[index].name

    if (networkName === 'MainNet') {
      indicator = <img src={ neoImg } alt='neo' className={ style.mainNetNeoImg } />
    } else if (networkName === 'TestNet') {
      indicator = <img src={ flask } alt='flask' className={ style.networkOptionIcon } />
    } else if (networkName === 'CoZ TestNet') {
      // set icon font
    } else {
      // set rounded colored dot with inline style
    }

    return indicator
  }

  generateNetworkOptions(networks) {
    const networkOptions = []
    const { selectedNetworkId } = this.props

    Object.keys(networks).forEach(index => {
      const indicator = this.getIndicator(networks, index)

      const selected = selectedNetworkId === networks[index].name

      networkOptions.push(
        <button key={ `option-key-${index}` } data-value={ index } className={ style.networkOptionButton }>
          {indicator}
          {networks[index].name}
          {selected && <div className={ style.networkNavigationOptionSelected } />}
        </button>
      )
    })
    return networkOptions
  }

  render() {
    const { networks } = this.props
    const { networkMenuOpen } = this.state

    const networkOptions = this.generateNetworkOptions(networks)

    let dropdownStyles
    if (networkMenuOpen) {
      dropdownStyles = `${style.networkNavigationDropdown} ${style.networkNavigationDropdownOpen}`
    } else {
      dropdownStyles = style.networkNavigationDropdown
    }

    return (
      <section className={ style.networkNavigation }>
        <button className={ style.networkNavigationButton } onClick={ this.toggleDropdownMenu }>
          <img src={ globe } className={ style.networkNavigationGlobe } alt='globe' />
          <img src={ chevron } className={ style.networkNavigationChevron } alt='chevron down' />
        </button>
        <div className={ dropdownStyles } onClick={ this.changeNetwork }>
          {networkOptions}
        </div>
      </section>
    )
  }
}

NetworkSwitcher.propTypes = {
  selectedNetworkId: PropTypes.string,
  setNetwork: PropTypes.func,
  networks: PropTypes.object,
}

export default NetworkSwitcher
