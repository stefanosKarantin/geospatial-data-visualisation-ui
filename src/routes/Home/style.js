import { jss } from 'static/styles';

const styles = {
  timeline: {
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  filters: {
    backgroundColor: '#1d2346',
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderBottom: '1px solid',
    zIndex: 1
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
