import { jss } from 'static/styles';

const styles = {
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
      graphsSideBar: {
        overflow: 'initial'
      },
      logoutBtn: {
          position: 'absolute',
          top: '8px',
          left: '8px'
      },
      logoutIcon: {
        fill: 'white',
        width: '30px'
      }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
