import { jss } from 'static/styles';

const styles = {
    graphsWrapper: {
        fontSize: '14px',
        color: '#f1eded',
        marginTop: '40px'
      }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles,
};
