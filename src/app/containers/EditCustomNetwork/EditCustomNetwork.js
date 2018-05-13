import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { validateLength } from '../../utils/helpers'

import Box from '../../components/common/Box'
import SettingsNavigation from '../../components/SettingsNavigation'
import InputField from '../../components/common/form/InputField'
import SelectBox from '../../components/common/form/SelectBox'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'
import NetworkSuccessPage from '../../components/successPages/NetworkSuccessPage'

import style from './EditCustomNetwork.css'

export class EditCustomNetwork extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      name: 'somename',
      url: '',
      apiType: 'neoscan',
      showSuccess: false,
      errors: {
        name: '',
        url: '',
        apiType: '',
      },
    }
  }

  componentDidMount() {
    const { networks } = this.props
    const { id } = this.props.match.params

    const currentObjectName = Object.keys(networks).find(
      network => networks[network].name.toLowerCase() === id.toLowerCase()
    )

    const currentObject = networks[currentObjectName]

    this.props.initialize({ name: currentObject.name, url: currentObject.url, apiType: currentObject.apiType })
  }

  _clearErrors(key) {
    this._setErrorState(key, '')
  }

  _setErrorState = (key, value) => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [key]: value,
      },
    }))
  }

  _renderSelectField = ({ input, ...rest }) => (
    <SelectBox { ...input } { ...rest } onChangeHandler={ event => input.onChange(event.target.value) } />
  )

  _renderTextField = ({ input, ...rest }) => (
    <InputField
      { ...input }
      { ...rest }
      onChangeHandler={ event => {
        input.onChange(event.target.value)
        this._clearErrors(event.target.name)
      } }
    />
  )

  _validateName = input => {
    if (!validateLength(input, 3)) {
      this._setErrorState('name', 'Name must be longer than 3 characters')
      return false
    }

    return true
  }

  _validateUrl = input => {
    if (!validateLength(input, 10)) {
      this._setErrorState('url', 'Url must be longer than 3 characters')
      return false
    }
    return true
  }

  handleSubmit = (values, dispatch, formProps) => {
    const { reset } = formProps
    const { name, url, apiType } = values
    const { id } = this.state
    const { editCustomNetwork } = this.props

    const validatedName = this._validateName(name)
    const validatedUrl = this._validateUrl(url)

    if (validatedName && validatedUrl && apiType) {
      editCustomNetwork(name, url, apiType, id)
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
    const { errors, showSuccess, name } = this.state
    const { handleSubmit, history } = this.props

    return (
      <Fragment>
        {showSuccess ? (
          <NetworkSuccessPage history={ history } title={ 'Network Updated' } />
        ) : (
          <section className={ style.addCustomNetwork }>
            <SettingsNavigation history={ history } path='/manageNetworks' />
            <section className={ style.addCustomNetworkContainer }>
              <Box classNames={ style.addCustomNetworkBox }>
                <h1 className={ style.addCustomNetworkHeading }>Add Network</h1>
                <form onSubmit={ handleSubmit(this.handleSubmit) } className={ style.addCustomNetworkForm }>
                  <Field
                    component={ this._renderTextField }
                    type='text'
                    value={ name }
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

EditCustomNetwork.propTypes = {
  editCustomNetwork: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  networks: PropTypes.object.isRequired,
  match: PropTypes.object,
  initialize: PropTypes.func,
}

export default reduxForm({
  form: 'editCustomNetwork',
  destroyOnUnmount: false,
})(EditCustomNetwork)
