import React from 'react'

import InputField from '../../components/common/form/InputField'
import PrimaryButton from '../../components/common/buttons/PrimaryButton'

import saveSVG from '../../../img/save.svg'
import style from './Home.css'

const RenameAccount = ({ accountName, onClickHandler, onChangeHandler }) => (
  <div className={ style.renameAccountContainer }>
    <h1 className={ style.renameAccountHeading }>Rename account</h1>
    <InputField onChangeHandler={ onChangeHandler } value={ accountName } />
    <PrimaryButton
      buttonText='Save'
      icon={ saveSVG }
      classNames={ style.renameAccountButton }
      onClickHandler={ onClickHandler }
    />
  </div>
)

export default RenameAccount
