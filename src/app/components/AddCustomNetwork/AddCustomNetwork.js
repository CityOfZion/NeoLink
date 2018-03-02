import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'rmwc/Button'
import { TextField } from 'rmwc/TextField'
import '@material/button/dist/mdc.button.min.css'
import '@material/textfield/dist/mdc.textfield.min.css'

class AddCustomNetwork extends Component {
  state = {
    name: '',
    url: '',
    statusMsg: '',
  }

  _handleTextFieldChange = (e) => {
    const key = e.target.id
    this.setState({
      [key]: e.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { name, url } = this.state
    const { addCustomNetwork } = this.props

    if (name && url) {
      addCustomNetwork(name, url)
      this.setState({
        name: '',
        url: '',
        statusMsg: 'Success. Your custom network has been added.',
      })
    } else {
      this.setState({
        statusMsg: 'Name and URL are required.',
      })
    }
  }

  render() {
    const { statusMsg } = this.state

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <TextField
            type='text'
            placeholder='Network Name'
            value={ this.state.name }
            id='name'
            onChange={ this._handleTextFieldChange }
          />
          <TextField
            type='text'
            placeholder='NeonDB URL'
            value={ this.state.url }
            id='url'
            onChange={ this._handleTextFieldChange }
          />
          <Button raised ripple>Add Custom Network</Button>
        </form>
        <div>
          { statusMsg }
        </div>
      </div>
    )
  }
}

AddCustomNetwork.propTypes = {
  addCustomNetwork: PropTypes.func,
}

export default AddCustomNetwork
