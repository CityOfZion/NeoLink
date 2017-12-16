import React, { Component } from 'react'

export default class CreateWallet extends Component {
  render () {
    return (
      <div class="content">
        <p class="card-title">Create Wallet</p>
        <button id="createWallet">Create Wallet</button>
        <div id="modalContent"></div>
      </div>
    )
  }
}
