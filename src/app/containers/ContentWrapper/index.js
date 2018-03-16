import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './ContentWrapper.css'

export default class ContentWrapper extends Component {
  render() {
    return <div className={ style.wrapper }>{this.props.children}</div>
  }
}

ContentWrapper.propTypes = {
  children: PropTypes.node,
}
