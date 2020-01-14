import React from 'react';
import Button from '@material-ui/core/Button';

import { connectProps } from 'store';
import {
  resetToken,
  resetUser,
} from 'model-services';

import {
  signIn,
  toggleLoadingTrue,
  resetState,
} from 'modules/component-props';

import LoginForm from './loginForm';

import { classes } from './style.js';
class Login extends React.Component {
  componentDidMount () {
    resetToken();
    resetUser();
    this.props.resetState();
  }
  render () {
    const { signIn, toggleLoadingTrue } = this.props;
    return (
      <div>
        <LoginForm
          onSubmit={(values) => {
            toggleLoadingTrue();
            signIn(values);
          }}
        />
      </div>
    )
  }
}

export default connectProps(
  signIn,
  toggleLoadingTrue,
  resetState
)(Login);
