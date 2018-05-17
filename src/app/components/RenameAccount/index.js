import React from 'react'
import PropTypes from 'prop-types'

import InputField from '../common/form/InputField'
import PrimaryButton from '../common/buttons/PrimaryButton'

import saveSVG from '../../../img/save.svg'
import style from './RenameAccount.css'

const RenameAccount = ({ accountName, onSubmitHandler, onChangeHandler, labelError }) => (
  <div className={ style.renameAccountContainer }>
    <h1 className={ style.renameAccountHeading }>Rename account</h1>
    <form onSubmit={ onSubmitHandler } className={ style.renameAccountForm }>
      <InputField
        onChangeHandler={ onChangeHandler }
        value={ accountName }
        error={ labelError }
        errorClassNames={ style.renameAccountError }
      />
      <PrimaryButton buttonText='Save' icon={ saveSVG } classNames={ style.renameAccountButton } />
    </form>
  </div>
)

RenameAccount.propTypes = {
  accountName: PropTypes.string.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  labelError: PropTypes.string,
}

export default RenameAccount
