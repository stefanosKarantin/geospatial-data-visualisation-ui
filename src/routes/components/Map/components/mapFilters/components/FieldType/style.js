import { jss } from 'static/styles';

const styles = {
    root: {
        display: 'flex',
        color: '#fff'
      },
    formControl: {
        margin: '16px',
    },
    checkbox: {
        color: '#fff !important'
    },
    checkboxLabel: {
        color: '#fff !important'
    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
