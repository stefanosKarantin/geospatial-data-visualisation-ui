import { jss } from 'static/styles'

const styles = {
  loginPage: {
    backgroundColor: 'white', //'#222a35',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '90vh',
    paddingTop: '64px'
  },
  loginPaper: {
    maxWidth: '100%',
    fontSize: '1rem',
    padding: '30px 30px',
    textAlign: 'center',
  },
  // slideTop: {
  //   '-webkit-animation': 'slide-top 1s',
  //   '-o-animation': 'slide-top 1s',
  //   'animation': 'slide-top 1s',
  //   '-webkit-animation-timing-function': 'ease-out',
  //   '-o-animation-timing-function': 'ease-out',
  //   animationTimingFunction: 'ease-out',
  //   '-webkit-animation-fill-mode': 'both',
  //   '-o-animation-fill-mode': 'both',
  //   animationFillMode: 'both',
  // },
  insidePaper: {
    padding: '50px 40px 40px',
    width: '400px',
    backgroundColor: 'white',
    boxShadow: '0 1px 1px rgba(0,0,0,.05)',
    borderRadius: '4px',
  },
  logo: {
    width: '120px',
  },
  loginTitle: {
    fontSize: '2rem',
    marginBottom: '88px'
  },
  loginSubtitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  loginForm: {
    marginBottom: '30px',
  },
  loginInput: {
    width: '100%',
    margin: '20px 0',
    height: '68px',
  },
  forgotPass: {
    color: '#6d7884',
    float: 'right',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  googleLoginBtn: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#222a35',
    color: 'white',
    marginTop: '40px',
    fontWeight: '600',
    '-webkit-transition': 'border .2s linear,color .2s linear,width .2s linear,background-color .2s linear',
    '-o-transition': 'border .2s linear,color .2s linear,width .2s linear,background-color .2s linear',
    transition: 'border .2s linear,color .2s linear,width .2s linear,background-color .2s linear',
    '&:hover': {
      backgroundColor: '#34556d',
    },
    '&:active': {
      backgroundColor: '#677480',
    },
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#222a35',
    color: 'white',
    marginBottom: '40px',
    fontWeight: '600',
    '-webkit-transition': 'border .2s linear,color .2s linear,width .2s linear,background-color .2s linear',
    '-o-transition': 'border .2s linear,color .2s linear,width .2s linear,background-color .2s linear',
    transition: 'border .2s linear,color .2s linear,width .2s linear,background-color .2s linear',
    '&:hover': {
      backgroundColor: '#34556d',
    },
    '&:active': {
      backgroundColor: '#677480',
    },
  },
  disabledButton: {
    cursor: 'not-allowed !important',
    pointerEvents: 'auto !important',
    backgroundColor: '#3a4758',
    '&:hover': {
      backgroundColor: '#3a4758 !important',
    },
  },
  signUp: {
    fontSize: '14px',
  },
  goToSignUp: {
    color: '#6d7884',
    textDecoration: 'none !important',
    '&:hover': {
      textDecoration: 'underline !important',
      cursor: 'pointer',
    },
  },
  textFieldInput: {
    '&:after': {
      borderBottomColor: 'black',
    },
  },
  textFieldLabel: {
    color: 'black !important',
  },
  loginError: {
    color: 'red',
  },
  '@media (max-width: 570px)': {
    loginPaper: {
      width: '100%'
    },
    insidePaper: {
      padding: 0,
      width: 'calc(100% - 40px)',
      margin: '0 auto 100px'
    }
  },
  '@keyframes slide-top': {
    '0%': {
      opacity: '0',
      '-webkit-transform': 'translate3d(0,-100%,0)',
      transform: 'translate3d(0,-100%,0)',
    },
    '100%': {
      opacity: '1',
      '-webkit-transform': 'translate3d(0,0,0)',
      transform: 'translate3d(0,0,0)',
    },
  },
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles,
};
