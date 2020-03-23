import { jss } from 'static/styles';

const styles = {
  timeline: {
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sideBar: {
    backgroundColor: '#1d2346',
    width: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderBottom: '1px solid',
    zIndex: 1,
    position: 'relative',
    overflow: 'hidden'
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
