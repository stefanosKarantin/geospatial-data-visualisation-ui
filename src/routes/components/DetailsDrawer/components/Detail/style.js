import { jss } from 'static/styles';

const styles = {
    detailWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
        borderBottom: '1px solid #c4c3d0'
    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles,
};
