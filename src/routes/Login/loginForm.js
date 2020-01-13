import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Field, reduxForm } from 'redux-form'

import validate from './validate'

import { classes } from './style.js';

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

const LoginForm = ({ handleSubmit, pristine, reset, submitting, error, invalid }) =>
  <div className={classes.loginPage}>
    <div className={`${classes.loginPaper} ${classes.slideTop}`}>
      <div className={classes.insidePaper}>
        {/*<img src={logo} className={classes.logo} alt={'login-logo'}/>*/}
        <div className={classes.loginTitle}>{'We flat'}</div>
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
      </div>
    </div>
  </div>;

export default reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm);
