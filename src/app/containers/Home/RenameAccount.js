import React from 'react'

import InputField from '../../components/common/form/InputField'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'

import saveSVG from '../../../img/save.svg'
import style from './Home.css'

const RenameAccount = ({ accountName, onSubmitHandler, onChangeHandler }) => (
  <div className={ style.renameAccountContainer }>
    <h1 className={ style.renameAccountHeading }>Rename account</h1>
    <form onSubmit={ onSubmitHandler }>
      <InputField onChangeHandler={ onChangeHandler } value={ accountName } />
      <PrimaryButton buttonText='Save' icon={ saveSVG } classNames={ style.renameAccountButton } />
    </form>
  </div>
)

export default RenameAccount
