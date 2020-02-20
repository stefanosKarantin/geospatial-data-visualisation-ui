import React, { useEffect } from 'react';

import { connectProps } from 'store';
import { getToken } from 'model-services';

import {
    register,
    toggleLoadingTrue,
    changeLocation
} from 'modules/component-props';

import RegisterForm from './rergisterForm';

const Register = (props) => {
    useEffect(() => {
        getToken() && changeLocation('/dashboard')
    }, [])

    const { register, toggleLoadingTrue, changeLocation } = props;
    return (
        <div>
        <RegisterForm
            onSubmit={(values) => {
                toggleLoadingTrue();
                register(values);
            }}
        />
        </div>
    )
}


export default connectProps(
    register,
    toggleLoadingTrue,
    changeLocation
)(Register);
