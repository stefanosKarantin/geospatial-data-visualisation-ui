import { jss } from 'static/styles';

const styles = {
    filtersWrapper: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1
    },
    filter: {

    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
