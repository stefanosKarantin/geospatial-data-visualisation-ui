import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { changeLocation, logout } from 'modules/component-props';

import { connectProps } from 'store';

const styles = {
  root: {
    flexGrow: 3,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Bar = ( props ) => {
  const { logout } = props;
  return (
    <div style={styles.root} id="ela">
      <AppBar position="static">
        <Toolbar>
          <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={styles.grow} />

          <Button onClick={() => logout()} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Bar.propTypes = {
  changeLocation: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default connectProps(changeLocation, logout)(Bar);
