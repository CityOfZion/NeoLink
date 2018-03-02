import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../Home'
import Send from '../Send'
import TestInvoke from '../TestInvoke'
import SendInvoke from '../SendInvoke'
import Transactions from '../Transactions'
import Balance from '../Balance'
import CreateWallet from '../CreateWallet'
import ImportWallet from '../ImportWallet'
import ExportWallet from '../ExportWallet'
import Config from '../Config'

import Header from '../../components/Header'
import ContentWrapper from '../../components/ContentWrapper'

import style from './App.css'

export default class App extends Component {
  render () {
    return (
      <div className={ style.popup }>
        <Header />
        <ContentWrapper>
          <Switch>
            <Route path='/send' component={ Send } />
            <Route path='/testInvoke' component={ TestInvoke } />
            <Route path='/sendInvoke' component={ SendInvoke } />
            <Route path='/transactions' component={ Transactions } />
            <Route path='/balance' component={ Balance } />
            <Route path='/createWallet' component={ CreateWallet } />
            <Route path='/importWallet' component={ ImportWallet } />
            <Route path='/exportWallet' component={ ExportWallet } />
            <Route path='/config' component={ Config } />
            <Route path='/' component={ Home } />
          </Switch>
        </ContentWrapper>
      </div>
    )
  }
}
