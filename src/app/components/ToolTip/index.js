import React from 'react'
import PropTypes from 'prop-types'

import style from './ToolTip.css'

const ToolTip = ({ icon, toolTipText, toolTipTextClassNames, classNames }) => (
  <div className={ `${style.toolTip} ${classNames}` }>
    <img src={ icon } alt='tooltip' className={ style.toolTipImage } />
    <span className={ `${style.toolTipText} ${toolTipTextClassNames}` }>{toolTipText}</span>
  </div>
)

ToolTip.propTypes = {
  icon: PropTypes.string.isRequired,
  toolTipText: PropTypes.string.isRequired,
  toolTipTextClassNames: PropTypes.string,
  classNames: PropTypes.string,
}

export default ToolTip
