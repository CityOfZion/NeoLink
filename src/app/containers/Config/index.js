import React, { Component } from 'react'

export default class Config extends Component {
  render () {
    return (
      <div class="content">
        <p class="card-title">Configuration</p>
        <input id="configUseLoggedInAddress" type="checkbox" />Use Default Login Address
        <button id="updateConfigButton">Update</button>
        <div id="modalContent"></div>
      </div>
    )
  }
}
