import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from '../Home'
import Send from '../Send'
import TestInvoke from '../TestInvoke'
import SendInvoke from '../SendInvoke'
import CreateWallet from '../CreateWallet'
import ImportWallet from '../ImportWallet'
import ExportWallet from '../ExportWallet'
import Config from '../Config'
import ContentWrapper from '../../components/ContentWrapper'
import StartPage from '../../components/StartPage'
import Login from '../../components/Login'
import Header from '../../components/Header'

import style from './App.css'

const ConnectedSwitch = connect(state => ({
  location: state.router.location,
}))(Switch)

export default class App extends Component {
  render() {
    return (
      <div className={ style.popup }>
        <Header showMenu />
        <ContentWrapper>
          <ConnectedSwitch>
            <Route path='/login' component={ Login } />
            <Route path='/home' component={ Home } />
            <Route path='/send' component={ Send } />
            <Route path='/testInvoke' component={ TestInvoke } />
            <Route path='/sendInvoke' component={ SendInvoke } />
            <Route path='/createWallet' component={ CreateWallet } />
            <Route path='/newAccountFromWIF' render={ props => <CreateWallet manualWIF { ...props } /> } />
            <Route path='/importWallet' component={ ImportWallet } />
            <Route path='/exportWallet' component={ ExportWallet } />
            <Route path='/config' component={ Config } />
            <Route path='/' component={ StartPage } />
          </ConnectedSwitch>
        </ContentWrapper>
      </div>
    )
  }
}
