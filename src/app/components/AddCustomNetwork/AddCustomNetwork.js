import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

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

  _renderTextField = ({
    input,
    ...rest
  }) => (
    <TextField
      { ...input }
      { ...rest }
      onChange={ (event) => input.onChange(event.target.value) }
    />
  )

  handleSubmit = (values, dispatch, formProps) => {
    const { reset } = formProps
    const { name, url } = values
    const { addCustomNetwork } = this.props

    if (name && url) {
      addCustomNetwork(name, url)
      this.setState({
        name: '',
        url: '',
        statusMsg: 'Success. Your custom network has been added.',
      })
      reset()
    } else {
      this.setState({
        statusMsg: 'Name and URL are required.',
      })
    }
  }

  render() {
    const { statusMsg } = this.state
    const { handleSubmit } = this.props

    return (
      <div>
        <form onSubmit={ handleSubmit(this.handleSubmit) }>
          <Field
            component={ this._renderTextField }
            type='text'
            placeholder='Network Name'
            name='name'
          />
          <Field
            component={ this._renderTextField }
            type='text'
            placeholder='NeonDB URL'
            name='url'
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
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

export default reduxForm({ form: 'addCustomerNetwork', destroyOnUnmount: false })(AddCustomNetwork)
