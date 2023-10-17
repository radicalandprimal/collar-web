import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { BrowserRouter, Route } from 'react-router-dom';

import Index from './Index';
import './global.scss';
import Navbar from './layout/Navbar';
import Login from './auth/Login';
import Account from './account/Account';
import Verify from './verify/Verify';
import DeviceAccept from './verify/DeviceAccept';
import Reset from './reset/Reset';

@inject('store')
@observer
 class App extends Component {
   constructor(props) {
     super(props);

     this.store = this.props.store;
   }

   componentDidMount() {
     this.store.checkForSession();
   }

   render() {
     return (
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/verify/:id" component={Verify} />
        <Route exact path="/device/accept/:id" component={DeviceAccept} />
        <Route exact path="/account/reset" component={Reset} />
      </BrowserRouter>
     )
   }
 }

export default App;
