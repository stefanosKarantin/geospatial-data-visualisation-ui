import { jss } from 'static/styles';

const styles = {
    regionSelection: {
        width: '80%',
        position: 'absolute',
        top: '70px',
    },
    inputLabel: {
        color: 'white',
        fill: 'white'
    },
    selection: {
        width: '100%',
        '&:before': {
            borderColor: 'white !important'
        },
        '& > div > svg': {
            fill: 'white'
        },
        '& > div > div': {
            color: 'white'
        }
    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles
};
