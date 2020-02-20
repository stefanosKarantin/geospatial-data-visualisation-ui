import { jss } from 'static/styles';

const styles = {
    notFoundWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    title: {
        color: '#4a5380',
        fontSize: '180px',
        fontWeight: '100',
        marginBottom: '0px'
    },
    subtitle: {
        color: '#4a5380',
        fontWeight: 300,
        marginTop: '10px',
        lineHeight: '1.5',
    }
};

const classes = jss.createStyleSheet(styles).attach().classes;

export {
  classes,
  styles,
};
