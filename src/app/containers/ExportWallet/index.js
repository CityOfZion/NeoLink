import React, { Component } from 'react'

export default class ExportWallet extends Component {
  render () {
    return (
      <div class="content">
        <p class="card-title">Export Wallet</p>
        <button id="exportWallet">Export Wallet</button>
        <div id="modalContent"></div>
      </div>
    )
  }
}
