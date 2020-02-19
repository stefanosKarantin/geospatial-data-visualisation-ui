import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form'
import { GoogleLogin } from 'react-google-login';
import validate from './validate'

import { classes } from './style.js';

import { connectProps } from 'store';

import {
    register,
    changeLocation,
    googleLogin
} from 'modules/component-props';

const renderField = ({
  input,
  label,
  id,
  type,
  meta: { asyncValidating, touched, error }
}) =>
  <div>
    <div>
      <TextField
       {...input}
       error={(touched && error) ? true : false}
       helperText={touched && error}
       id={id}
       label={label}
       className={classes.loginInput}
       type={type}
       margin="normal"
       InputProps={{
        classes: {
          root: classes.textFieldInput,
          disabled: classes.disabledButton,
        },
       }}
       InputLabelProps={{
         className: classes.textFieldLabel,
       }}
      />
    </div>
  </div>

const RegisterForm = ({
    handleSubmit,
    pristine,
    reset,
    submitting,
    error,
    invalid,
    changeLocation,
    googleLogin
}) =>
  <div className={classes.loginPage}>
    <div className={`${classes.loginPaper} ${classes.slideTop}`}>
      <div className={classes.insidePaper}>
        <div className={classes.loginTitle}>{'GEO DATA VISUALIZE'}</div>
        <div className={classes.loginSubtitle}>{'Sign Up'}</div>
        <form onSubmit={handleSubmit} className={classes.loginForm}>
          <Field
            name={'email'}
            type={'text'}
            component={renderField}
            label={'Email'}
          />
          <Field
            name={'password'}
            type={'password'}
            component={renderField}
            label={'Password'}
          />
          <Field
            name={'confirm'}
            type={'password'}
            component={renderField}
            label={'Confirm Password'}
          />
         {error && <div className={classes.loginError}>{error}</div>}
         <Button
            disableRipple
            classes={{
              root: classes.signInButton,
              disabled: classes.disabledButton,
            }}
            type={'submit'}
            disabled={invalid}
         >
           {'Sign up'}
         </Button>
        </form>
        <Button
            disableRipple
            classes={{
              root: classes.signUpButton,
            }}
            onClick={() => changeLocation('/')}
         >
           {'Already a user'}
         </Button>
        <GoogleLogin
            clientId="206578547470-qtpfqnnaik8uci4gc415tj1428pan031.apps.googleusercontent.com"
            buttonText="Sign Up"
            onSuccess={(response) => {
                response.profileObj &&
                    googleLogin({
                        accessToken: response.accessToken,
                        tokenId: response.tokenId,
                        email: response.profileObj.email
                    });
            }}
            onFailure={(response) => console.log(response)}
            cookiePolicy={'single_host_origin'}
            className={classes.googleLoginBtn}
        />
      </div>
    </div>
  </div>;

export default connectProps(changeLocation, googleLogin)(reduxForm({
  form: 'registerForm',
  validate,
})(RegisterForm));
