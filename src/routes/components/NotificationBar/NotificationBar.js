import React from 'react';

import { connectProps } from 'store';

import {
    CheckCircle,
    Error,
    Info,
    Close,
    Warning
} from '@material-ui/icons';

import {
    IconButton,
    Snackbar,
    SnackbarContent
} from '@material-ui/core';

import { notification, updateNotification } from 'modules/component-props';

import { classes } from './style';

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

class NotificationBar extends React.Component {
  handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

  this.props.updateNotification({ open: false });
  };

  render() {
    const { notification = {type: 'info', message: ''} } = this.props;
    const { type, message } = notification;
    const Icon = variantIcon[type] || Info;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={notification.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
        <SnackbarContent
          className={classes[type]}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classes.icon + ' ' + classes.iconVariant} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <Close className={classes.icon} />
            </IconButton>,
          ]}
        />
        </Snackbar>
      </div>
    );
  }
}

export default connectProps(notification, updateNotification)(NotificationBar);
