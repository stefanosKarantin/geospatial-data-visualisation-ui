import { jss } from 'static/styles';

const styles = {
  loaderWrapper: {
    position: 'fixed',
    height: '100%',
    top: '0px',
    zIndex: 1000,
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    background: 'rgba(204, 206, 210, 0.7)',
    justifyContent: 'center'
  },
  loaderInvisible: {
    display: 'none'
  },
  loader: {
    color: '#2c324e'
  }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
