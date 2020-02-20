import { jss } from 'static/styles';

const styles = {
  success: {
    backgroundColor: '#43a047',
  },
  error: {
    backgroundColor: '#d32f2f',
  },
  info: {
    backgroundColor: '#1976d2',
  },
  warning: {
    backgroundColor: '#ffa000',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: '8px',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
