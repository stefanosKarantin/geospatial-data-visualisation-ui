import React, { useEffect } from 'react';

import { connectProps } from 'store';
import { getToken } from 'model-services';

import {
  signIn,
  toggleLoadingTrue,
  changeLocation
} from 'modules/component-props';

import LoginForm from './loginForm';

const Login = (props) => {
    useEffect(() => {
        getToken() && changeLocation('/dashboard')
    }, [])
    const { signIn, toggleLoadingTrue, changeLocation } = props;
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
};

export default connectProps(
  signIn,
  toggleLoadingTrue,
  changeLocation
)(Login);
