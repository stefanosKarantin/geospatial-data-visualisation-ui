import { jss } from 'static/styles';

const styles = {
    root: {
        display: 'flex',
      },
    formControl: {
        margin: '16px',
    },
    checkbox: {
        color: '#cdd6e0 !important'
    },
    checkboxLabel: {
        color: '#cdd6e0 !important'
    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
