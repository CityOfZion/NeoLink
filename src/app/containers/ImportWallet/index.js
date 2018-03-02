import React, { Component } from 'react'

export default class ImportWallet extends Component {
  render() {
    return (
      <div className='content'>
        <p className='card-title'>Import Wallet</p>
        <button id='importWallet'>Import Wallet</button>
        <div id='modalContent' />
      </div>
    )
  }
}
