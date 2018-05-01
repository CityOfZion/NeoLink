import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import Box from '../../components/common/Box'
import SettingsNavigation from '../../components/SettingsNavigation'
import InputField from '../../components/common/form/InputField'
import SelectBox from '../../components/common/form/SelectBox'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'

import style from './AddCustomNetwork.css'

class AddCustomNetwork extends Component {
  state = {
    name: '',
    url: '',
    statusMsg: '',
    apiType: 'neoscan',
  }

  _renderSelectField = ({ input, ...rest }) => (
    <SelectBox { ...input } { ...rest } onChangeHandler={ event => input.onChange(event.target.value) } />
  )

  _renderTextField = ({ input, ...rest }) => (
    <InputField { ...input } { ...rest } onChangeHandler={ event => input.onChange(event.target.value) } />
  )

  handleSubmit = (values, dispatch, formProps) => {
    const { reset } = formProps
    const { name, url, apiType } = values
    const { addCustomNetwork } = this.props

    if (name && url && apiType) {
      addCustomNetwork(name, url, apiType)
      this.setState({
        name: '',
        url: '',
        apiType: '',
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
    const { handleSubmit, history } = this.props

    return (
      <section className={ style.addCustomNetwork }>
        <SettingsNavigation history={ history } />
        <section className={ style.addCustomNetworkContainer }>
          <Box classNames={ style.addCustomNetworkBox }>
            <h1 className={ style.addCustomNetworkHeading }>Add Network</h1>
            <form onSubmit={ handleSubmit(this.handleSubmit) } className={ style.addCustomNetworkForm }>
              <Field component={ this._renderTextField } type='text' name='name' label='Network Name' />
              <Field component={ this._renderTextField } type='text' name='url' label='Network URL' />
              <Field
                label='API Type'
                component={ this._renderSelectField }
                name='apiType'
                options={ [
                  {
                    label: 'neoscan',
                    value: 'neoscan',
                  },
                  {
                    label: 'neonDB',
                    value: 'neonDB',
                  },
                ] }
              />
              <PrimaryButton buttonText='Add Network' classNames={ style.addCustomNetworkButton } />
            </form>
            <div>{statusMsg}</div>
          </Box>
        </section>
      </section>
    )
  }
}

AddCustomNetwork.propTypes = {
  addCustomNetwork: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default reduxForm({ form: 'addCustomerNetwork', destroyOnUnmount: false })(AddCustomNetwork)
