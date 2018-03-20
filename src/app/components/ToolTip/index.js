import React from 'react'

import style from './ToolTip.css'

const ToolTip = ({ icon, toolTipText, toolTipTextClassNames, classNames }) => (
  <div className={ `${style.toolTip} ${classNames}` }>
    <img src={ icon } alt='tooltip' className={ style.toolTipImage } />
    <span className={ `${style.toolTipText} ${toolTipTextClassNames}` }>{toolTipText}</span>
  </div>
)

export default ToolTip
