import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import Box from '../../components/common/Box'
import SettingsNavigation from '../../components/SettingsNavigation'
import InputField from '../../components/common/form/InputField'
import SelectBox from '../../components/common/form/SelectBox'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'
import NetworkSuccessPage from '../../components/successPages/NetworkSuccessPage'

import withForm from '../../components/HoC/withForm'

import style from './AddCustomNetwork.css'

export class AddCustomNetwork extends Component {
  state = {
    name: '',
    url: '',
    apiType: 'neoscan',
    showSuccess: false,
  }

  _renderSelectField = ({ input, ...rest }) => (
    <SelectBox { ...input } { ...rest } onChangeHandler={ event => input.onChange(event.target.value) } />
  )

  _renderTextField = ({ input, ...rest }) => {
    const { clearFormFieldError } = this.props

    return (
      <InputField
        { ...input }
        { ...rest }
        onChangeHandler={ event => {
          input.onChange(event.target.value)
          clearFormFieldError(event.target.name)
        } }
      />
    )
  }

  _uniqueName = input => {
    const { networks } = this.props

    const filteredNetworks = Object.keys(networks).filter(
      networkName => networks[networkName].name.toLowerCase() === input.toLowerCase()
    )

    return filteredNetworks.length !== 0
  }

  _validateName = input => {
    const { setFormFieldError, validateLength } = this.props

    if (!validateLength(input, 3)) {
      setFormFieldError('name', 'Name must be longer than 3 characters')
      return false
    }

    if (this._uniqueName(input)) {
      setFormFieldError('name', 'Name must be unique')
      return false
    }

    return true
  }

  _validateUrl = input => {
    const { setFormFieldError, validateLength } = this.props

    if (!validateLength(input, 10)) {
      setFormFieldError('url', 'Url must be longer than 3 characters')
      return false
    }
    return true
  }

  handleSubmit = (values, dispatch, formProps) => {
    const { reset } = formProps
    const { name, url, apiType } = values
    const { addCustomNetwork } = this.props

    const validatedName = this._validateName(name)
    const validatedUrl = this._validateUrl(url)

    if (validatedName && validatedUrl && apiType) {
      addCustomNetwork(name, url, apiType)
      this.setState({
        name: '',
        url: '',
        apiType: '',
        showSuccess: true,
      })
      reset()
    }
  }

  render() {
    const { showSuccess } = this.state
    const { handleSubmit, history, errors } = this.props

    return (
      <Fragment>
        {showSuccess ? (
          <NetworkSuccessPage history={ history } title={ 'Network Added' } />
        ) : (
          <section className={ style.addCustomNetwork }>
            <SettingsNavigation history={ history } />
            <section className={ style.addCustomNetworkContainer }>
              <Box classNames={ style.addCustomNetworkBox }>
                <h1 className={ style.addCustomNetworkHeading }>Add Network</h1>
                <form onSubmit={ handleSubmit(this.handleSubmit) } className={ style.addCustomNetworkForm }>
                  <Field
                    component={ this._renderTextField }
                    type='text'
                    name='name'
                    label='Network Name'
                    error={ errors.name }
                  />
                  <Field
                    component={ this._renderTextField }
                    type='text'
                    name='url'
                    label='Network URL'
                    error={ errors.url }
                  />
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
              </Box>
            </section>
          </section>
        )}
      </Fragment>
    )
  }
}

AddCustomNetwork.propTypes = {
  addCustomNetwork: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  networks: PropTypes.object.isRequired,
  clearFormFieldError: PropTypes.func.isRequired,
  setFormFieldError: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  validateLength: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'addCustomerNetwork',
  initialValues: { apiType: 'neoscan' },
  destroyOnUnmount: false,
})(withForm(AddCustomNetwork))
