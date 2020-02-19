import React from 'react';
import Button from '@material-ui/core/Button';

import { connectProps } from 'store';
import {
  resetToken,
  resetUser,
} from 'model-services';

import {
    register,
    toggleLoadingTrue,
    resetState,
} from 'modules/component-props';

import RegisterForm from './rergisterForm';

import { classes } from './style.js';

class Register extends React.Component {
    componentDidMount () {
        resetToken();
        resetUser();
        this.props.resetState();
    }
    render () {
        const { register, toggleLoadingTrue } = this.props;
        return (
            <div>
            <RegisterForm
                onSubmit={(values) => {
                    console.log(values)
                    toggleLoadingTrue();
                    register(values);
                }}
            />
            </div>
        )
    }
}

export default connectProps(
    register,
    toggleLoadingTrue,
    resetState
)(Register);
