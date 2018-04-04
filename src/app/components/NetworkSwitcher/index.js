import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './NetworkSwitcher.css'

import globe from '../../../img/globe.svg'
import chevron from '../../../img/chevron-down.svg'
import neoImg from '../../../img/icon-34.png'
import flask from '../../../img/flask.svg'

class NetworkSwitcher extends Component {
  state = {
    networkMenuOpen: false,
  }

  componentDidMount() {
    window.addEventListener('click', event => {
      if (!event.target.className.includes('NetworkSwitcher')) {
        this.closeDropdownMenu()
      }
    })
  }

  changeNetwork = event => {
    const { setNetwork } = this.props
    let dataset = event.target.dataset.value || event.target.parentNode.dataset.value

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
    } else {
      indicator = (
        <div
          style={ {
            height: '13px',
            width: '15px',
            marginRight: '8px',
            borderRadius: '3px',
            backgroundColor: '#f15c5c',
          } }
        />
      )
    }

    return indicator
  }

  generateNetworkOptions() {
    const networkOptions = []
    const { selectedNetworkId, networks } = this.props

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

  generateDropdownClasses = () => {
    const { networkMenuOpen } = this.state

    let dropdownStyles
    if (networkMenuOpen) {
      dropdownStyles = `${style.networkNavigationDropdown} ${style.networkNavigationDropdownOpen}`
    } else {
      dropdownStyles = style.networkNavigationDropdown
    }

    return dropdownStyles
  }

  render() {
    const networkOptions = this.generateNetworkOptions()
    const dropdownStyles = this.generateDropdownClasses()

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
