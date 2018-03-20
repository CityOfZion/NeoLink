import React, { Component } from 'react'

import SuccessPage from '../SuccessPage'
import InputField from '../../common/form/InputField'
import CheckBox from '../../../components/common/form/CheckBox'
import SecondaryButton from '../../common/buttons/SecondaryButton'

class CreateWalletSuccessPage extends Component {
  constructor() {
    super()

    this.state = {
      showButton: false,
    }
  }

  handleCheckBoxClick = () => {
    this.setState(prevState => ({ showButton: !prevState.showButton }))
  }

  render() {
    const { showButton } = this.state
    const { encryptedWif, address } = this.props

    return (
      <SuccessPage title={ 'Wallet Created' }>
        <InputField value={ address } encryptedWif={ encryptedWif } disabled />
        <CheckBox onClickHandler={ this.handleCheckBoxClick } labelText={ 'I\'ve saved my encrypted key' } />
        {showButton && <SecondaryButton buttonText={ 'Proceed to Home' } />}
      </SuccessPage>
    )
  }
}

export default CreateWalletSuccessPage
