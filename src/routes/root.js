import React from 'react';

import {
  Route,
  withRouter
} from 'react-router-dom'

import {
  AppBar,
  PrivateRoute
} from './components';

import { Home } from './Home';
import { Login } from './Login';

const Root = () => (
  <div style={{height: '100%'}}>
    {/*<AppBar />*/}
    <Route exact path='/' component={Login} />
    <PrivateRoute exact path='/dashboard' component={Home}/>
  </div>
);

export default withRouter(Root);
