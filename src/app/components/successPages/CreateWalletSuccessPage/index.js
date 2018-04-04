import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SuccessPage from '../SuccessPage'
import InputField from '../../common/form/InputField'
import CheckBox from '../../../components/common/form/CheckBox'
import TextArea from '../../../components/common/form/TextArea'
import SecondaryButton from '../../common/buttons/SecondaryButton'
import ToolTip from '../../ToolTip'

import questionSVG from '../../../../img/question.svg'

import style from './CreateWalletSuccessPage.css'

export class CreateWalletSuccessPage extends Component {
  state = {
    showButton: false,
  }

  handleCheckBoxClick = () => {
    this.setState(prevState => ({ showButton: !prevState.showButton }))
  }

  render() {
    const { showButton } = this.state
    const { encryptedWif, address, history } = this.props

    return (
      <SuccessPage title={ 'Wallet Created' }>
        <InputField value={ address } label={ 'Address' } labelClassNames={ style.createWalletSuccessPageLabel } disabled>
          <ToolTip
            icon={ questionSVG }
            toolTipText={ 'Your NEO wallet public address. Share this with anyone in order to receive NEO to this address.' }
            toolTipTextClassNames={ style.createWalletSuccessPageAddressToolTipTextPosition }
            classNames={ style.createWalletSuccessPageAddressPageToolTipPosition }
          />
        </InputField>
        <TextArea
          value={ encryptedWif }
          label={ 'Encrypted Key' }
          classNames={ style.createWalletSuccessPageTextArea }
          labelClassNames={ style.createWalletSuccessPageLabel }
          disabled
        >
          <ToolTip
            icon={ questionSVG }
            toolTipText={ 'Your encrypted key (also known as WIF). Do not share this with anyone, and make sure you write it down. Use this key to unlock your wallet on any NEO compatible interface.' }
            toolTipTextClassNames={ style.createWalletSuccessPageWifToolTipTextPosition }
            classNames={ style.createWalletSuccessPageWifPageToolTipPosition }
          />
        </TextArea>

        <CheckBox onClickHandler={ this.handleCheckBoxClick } label={ 'I\'ve saved my encrypted key' } />
        {showButton && (
          <SecondaryButton
            buttonText={ 'Proceed to Home' }
            classNames={ style.createWalletSuccessPageButton }
            onClickHandler={ () => history.push('/home') }
          />
        )}
      </SuccessPage>
    )
  }
}

CreateWalletSuccessPage.propTypes = {
  encryptedWif: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default CreateWalletSuccessPage
