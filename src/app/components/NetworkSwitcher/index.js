import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import DropDown from '../DropDown'

import style from './NetworkSwitcher.css'

import globe from '../../../img/globe.svg'
import chevron from '../../../img/chevron-down.svg'
import neoImg from '../../../img/icon-34.png'
import flask from '../../../img/flask.svg'

import { getBalance, getTransactions } from '../../utils/helpers'

class NetworkSwitcher extends Component {
  changeNetwork = selectedNetworkId => {
    const { setNetwork, setTransactions, account, setBalance, networks } = this.props

    if (selectedNetworkId) {
      setNetwork(selectedNetworkId)
      getBalance(networks, selectedNetworkId, account).then(results => setBalance(results.neo, results.gas))
      getTransactions(networks, selectedNetworkId, account).then(results => setTransactions(results))
    }
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

      const selected = selectedNetworkId === index

      networkOptions.push(
        <button
          key={ `option-key-${index}` }
          className={ style.networkOptionButton }
          onClick={ () => this.changeNetwork(index) }
        >
          {indicator}
          {networks[index].name}
          {selected && <div className={ style.networkNavigationOptionSelected } />}
        </button>
      )
    })
    return networkOptions
  }

  render() {
    const networkOptions = this.generateNetworkOptions()

    const buttonContent = (
      <Fragment>
        <img src={ globe } className={ style.networkNavigationGlobe } alt='globe' />
        <img src={ chevron } className={ style.networkNavigationChevron } alt='chevron down' />
      </Fragment>
    )

    return (
      <section className={ style.networkNavigation }>
        <DropDown
          buttonContent={ buttonContent }
          buttonStyles={ style.networkNavigationButton }
          classNames={ style.networkNavigationButtonContainer }
          dropDownContent={ networkOptions }
          dropDownContentClassNames={ style.networkNavigationDropDownContainer }
        />
      </section>
    )
  }
}

NetworkSwitcher.propTypes = {
  selectedNetworkId: PropTypes.string,
  setTransactions: PropTypes.func,
  setNetwork: PropTypes.func,
  setBalance: PropTypes.func,
  account: PropTypes.object,
  networks: PropTypes.object,
}

export default NetworkSwitcher
