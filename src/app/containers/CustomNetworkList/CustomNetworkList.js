import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import SettingsNavigation from '../../components/SettingsNavigation'

import style from './CustomNetworkList.css'

class CustomNetworkList extends Component {
  delete = index => {
    const { deleteCustomNetwork, setNetwork, selectedNetworkId } = this.props

    // If this is the current network they're using, reset to MainNet
    if (selectedNetworkId === index) {
      setNetwork('MainNet')
    }

    deleteCustomNetwork(index)
  }

  truncateUrl = url => (url.length >= 22 ? `${url.slice(0, 19)}...` : url)

  generateNetworkRows(networks) {
    const networkRows = []
    Object.keys(networks).forEach(index => {
      const network = networks[index]
      if (network.canDelete) {
        networkRows.push(
          <section className={ style.customNetworkCard } key={ index }>
            <div className={ style.customNetworkColorContainer }>
              <div className={ style.customNetworkColor } />
            </div>
            <div className={ style.customNetworkContainer }>
              <h3>{network.name}</h3>
              <h3 className={ style.customNetworkUrl }>{this.truncateUrl(network.url)}</h3>
            </div>
            <button onClick={ () => this.delete(index) } className={ style.tempButton }>
              <i className='fas fa-ellipsis-v' />
            </button>
          </section>
        )
      }
    })

    return networkRows
  }

  render() {
    const { networks, history } = this.props

    const networkRows = this.generateNetworkRows(networks)

    const content = networkRows.length ? <Fragment>{networkRows}</Fragment> : 'You have no custom networks defined'

    return (
      <Fragment>
        <SettingsNavigation history={ history } />
        <section className={ style.manageNetworksContainer }>
          <h1>Manage Networks</h1>
          {content}
        </section>
      </Fragment>
    )
  }
}

CustomNetworkList.propTypes = {
  networks: PropTypes.object.isRequired,
  deleteCustomNetwork: PropTypes.func.isRequired,
  setNetwork: PropTypes.func.isRequired,
  selectedNetworkId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default CustomNetworkList
