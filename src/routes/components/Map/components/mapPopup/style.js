import { jss } from 'static/styles';

const styles = {
    popupWrapper: {
        color: 'white',
        position: 'absolute',
        top: '-126px',
        left: '-73px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        boxShadow: '50px 50px 40px 0px rgba(0, 0, 0, 0.3)',
        width: '320px',
        height: '280px',
        pointerEvents: 'none',
        marginTop: '64px'
    },
    detailsWrapper: {
        margin: '160px 0 0 120px',
    },
    detail: {
        padding: '8px'
    },
    detailKey: {
        fontWeight: 700,
        fontSize: '22px'
    },
    detailValue: {
        fontSize: '20px'
    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
