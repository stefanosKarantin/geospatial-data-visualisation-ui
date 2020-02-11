import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form'
import { GoogleLogin } from 'react-google-login';
import validate from './validate'

import { classes } from './style.js';

import { connectProps } from 'store';

import {
  signIn,
} from 'modules/component-props';

const responseGoogle = (response) => {
    console.log(response);
    // signIn({access_token: response.accessToken});
  }

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

const LoginForm = ({ handleSubmit, pristine, reset, submitting, error, invalid, signIn }) =>
  <div className={classes.loginPage}>
    <div className={`${classes.loginPaper} ${classes.slideTop}`}>
      <div className={classes.insidePaper}>
        {/*<img src={logo} className={classes.logo} alt={'login-logo'}/>*/}
        <div className={classes.loginTitle}>{'GEO DATA VISUALIZE'}</div>
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
           {'Sign in'}
         </Button>
        </form>
        <GoogleLogin
            clientId="206578547470-qtpfqnnaik8uci4gc415tj1428pan031.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={(response) => console.log(response)}
            cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  </div>;

export default connectProps(signIn)(reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm));
