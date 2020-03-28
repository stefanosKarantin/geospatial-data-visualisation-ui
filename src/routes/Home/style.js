import { jss } from 'static/styles';

const styles = {
  timeline: {
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapWrapper: {
    display: 'flex',
    height: 'calc(100% - 1px)'
  }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles,
};
