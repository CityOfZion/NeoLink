import React, {Component} from 'react'

import style from './ContentWrapper.css'

export default class Header extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.innerWrapper}>
          <div className={style.fancyBox}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
