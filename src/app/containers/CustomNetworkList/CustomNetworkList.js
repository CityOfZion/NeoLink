import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import SettingsNavigation from '../../components/SettingsNavigation'
import CustomNetworkCard from '../../components/CustomNetworkCard'
import Overlay from '../../components/Overlay'
import ConfirmDelete from '../../components/ConfirmDelete'

import style from './CustomNetworkList.css'

class CustomNetworkList extends Component {
  state = {
    showConfirmDelete: false,
    currentItem: '',
  }

  delete = index => {
    const { deleteCustomNetwork, setNetwork, selectedNetworkId } = this.props

    // If this is the current network they're using, reset to MainNet
    if (selectedNetworkId === index) {
      setNetwork('MainNet')
    }

    deleteCustomNetwork(index)
  }

  _truncateUrl = url => (url.length >= 22 ? `${url.slice(0, 19)}...` : url)

  _generateDropDownContent = index => (
    <ul className={ style.customNetworkDropdown }>
      <li>
        <button
          className={ style.customNetworkDropDownButton }
          onClick={ () => {
            this.showConfirmDelete()
            this.setCurrentItem(index)
          } }
        >
          <i className='fas fa-trash' /> Delete
        </button>
      </li>
    </ul>
  )

  showConfirmDelete = () => this.setState({ showConfirmDelete: true })

  setCurrentItem = index => this.setState({ currentItem: index })

  handleDelete = index => {
    this.delete(index)
    this.setState({ showConfirmDelete: false })
  }

  generateNetworkRows(networks) {
    const networkRows = []
    Object.keys(networks).forEach(index => {
      const network = networks[index]

      if (network.canDelete) {
        networkRows.push(
          <CustomNetworkCard
            name={ network.name }
            url={ this._truncateUrl(network.url) }
            key={ network.name }
            dropDownContent={ this._generateDropDownContent(index) }
          />
        )
      }
    })

    return networkRows
  }

  render() {
    const { showConfirmDelete, currentItem } = this.state
    const { networks, history } = this.props

    const networkRows = this.generateNetworkRows(networks)

    const content = networkRows.length ? <Fragment>{networkRows}</Fragment> : 'You have no custom networks defined'

    return (
      <Fragment>
        {showConfirmDelete && (
          <Overlay>
            <ConfirmDelete
              onClickAcceptHandler={ () => this.handleDelete(currentItem) }
              onClickRejectHandler={ () => this.setState({ showConfirmDelete: false }) }
              item={ currentItem }
            />
          </Overlay>
        )}
        <SettingsNavigation history={ history } />
        <section className={ style.manageNetworksContainer }>
          <h1 className={ style.manageNetworksHeading }>Manage Networks</h1>
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
