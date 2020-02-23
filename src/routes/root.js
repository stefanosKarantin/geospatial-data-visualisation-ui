import React from 'react';

import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom'

import {
  PrivateRoute
} from './components';

import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';
import { NotFound } from './NotFound';

import { NotificationBar } from 'routes/components';

const Root = () => (
  <div style={{height: '100%'}}>
    <NotificationBar />
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute exact path='/dashboard' component={Home}/>
        <Route component={NotFound} />
    </Switch>
  </div>
);

export default withRouter(Root);
