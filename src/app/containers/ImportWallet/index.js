import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ImportWallet extends Component {
  render () {
    return (
      <div class="content">
        <p class="card-title">Import Wallet</p>
        <button id="importWallet">Import Wallet</button>
        <div id="modalContent"></div>
      </div>
    )
  }
}
