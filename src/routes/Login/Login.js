import React from 'react';
import { connectProps } from 'store';
import {
  resetToken,
  resetUser,
} from 'model-services';

import {
  signIn,
  toggleLoadingTrue,
  resetState
} from 'modules/component-props';

import LoginForm from './loginForm';

class Login extends React.Component {
  componentDidMount () {
    resetToken();
    resetUser();
    this.props.resetState();
  }
  render () {
    const { signIn, toggleLoadingTrue } = this.props;
    return (
      <LoginForm
        onSubmit={(values) => {
          toggleLoadingTrue();
          signIn(values);
        }}
      />
    )
  }
}

export default connectProps(
  signIn,
  toggleLoadingTrue,
  resetState
)(Login);
