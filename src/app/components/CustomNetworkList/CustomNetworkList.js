import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './CustomNetworkList.css'

class CustomNetworkList extends Component {
  delete = (index) => {
    const { deleteCustomNetwork, setNetwork, selectedNetworkId } = this.props

    // If this is the current network they're using, reset to MainNet
    if (selectedNetworkId === index) {
      setNetwork('MainNet')
    }

    deleteCustomNetwork(index)
  }

  generateNetworkRows(networks) {
    const networkRows = []
    Object.keys(networks).forEach((index) => {
      const network = networks[index]
      if (network.canDelete) {
        networkRows.push((
          <div key={ `network-item-${index}` } className={ style.networkWrapper }>
            <div className={ style.networkInfo }>
              <div>{ network.name }</div>
              <div>Endpoint: { network.url }</div>
            </div>
            <a className={ style.deleteIcon } onClick={ () => this.delete(index) }>
              <svg fill='red' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'>
                <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' />
                <path d='M0 0h24v24H0z' fill='none' />
              </svg>
            </a>
          </div>
        ))
      }
    })

    return networkRows
  }

  render() {
    const { networks } = this.props

    const networkRows = this.generateNetworkRows(networks)

    const content = networkRows.length ? <div>{ networkRows }</div> : 'You have no custom networks defined'

    return (
      <div>
        {content}
      </div>
    )
  }
}

CustomNetworkList.propTypes = {
  networks: PropTypes.object.isRequired,
  deleteCustomNetwork: PropTypes.func.isRequired,
  setNetwork: PropTypes.func.isRequired,
  selectedNetworkId: PropTypes.string.isRequired,
}

export default CustomNetworkList
