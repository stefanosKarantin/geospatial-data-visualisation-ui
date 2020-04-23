import { jss } from 'static/styles';

const styles = {
    drawerWrapper: {
        padding: '16px',
        width: '100%',
        height: '100%',
        position: 'relative',
        bottom: 'calc(-100% - 16px)',
        left: 0,
        transition: 'bottom .5s cubic-bezier(0.820, 0.085, 0.395, 0.895)',
        backgroundColor: '#3e4b92',
        color: '#f1eded',
        fontSize: '24px'
    },
    active: {
        bottom: '-160px'
    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
