import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import SettingsNavigation from '../../components/SettingsNavigation'
import CustomNetworkCard from '../../components/CustomNetworkCard'
import Overlay from '../../components/Overlay'
import ConfirmDelete from '../../components/ConfirmDelete'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'

import style from './CustomNetworkList.css'

class CustomNetworkList extends Component {
  state = {
    showConfirmDelete: false,
    currentItem: {},
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

  _generateDropDownContent = (index, name) => (
    <ul className={ style.customNetworkDropdown }>
      <li>
        <button
          className={ style.customNetworkDropDownButton }
          onClick={ () => {
            this.showConfirmDelete()
            this.setCurrentItem(index, name)
          } }
        >
          <i className='fas fa-trash' /> Delete
        </button>
      </li>
    </ul>
  )

  showConfirmDelete = () => this.setState({ showConfirmDelete: true })

  setCurrentItem = (index, name) => {
    const currentItem = { name, index }
    this.setState({ currentItem })
  }

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
            dropDownContent={ this._generateDropDownContent(index, network.name) }
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

    const content = networkRows.length ? (
      <Fragment>{networkRows}</Fragment>
    ) : (
      <div className={ style.customNetworkNoNetworksBox }>
        <h4>You have no custom networks.</h4>
        <PrimaryButton buttonText={ 'Add Network' } onClickHandler={ () => history.push('/addCustomNetwork') } />
      </div>
    )

    return (
      <div>
        {showConfirmDelete && (
          <Overlay>
            <ConfirmDelete
              onClickAcceptHandler={ () => this.handleDelete(currentItem.index) }
              onClickRejectHandler={ () => this.setState({ showConfirmDelete: false }) }
              item={ currentItem.name }
            />
          </Overlay>
        )}
        <SettingsNavigation history={ history } />
        <section className={ style.manageNetworksContainer }>
          <h1 className={ style.manageNetworksHeading }>Manage Networks</h1>
          {content}
        </section>
      </div>
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
