import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  getToken,
  getUser,
} from 'model-services';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    getToken() && getUser()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
);

export default PrivateRoute;
