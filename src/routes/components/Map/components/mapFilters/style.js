import { jss } from 'static/styles';

const styles = {
    filtersWrapper: {
        position: 'absolute',
        top: '10px',
        left: '20px',
        zIndex: 1
    },
    popoverPaper: {
        backgroundColor: '#3f51b5'
    },
    filter: {

    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
