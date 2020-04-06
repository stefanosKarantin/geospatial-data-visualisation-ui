import { jss } from 'static/styles';

const styles = {
    regionSelection: {
        width: '80%'
    },
    selection: {
        width: '100%'
    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
