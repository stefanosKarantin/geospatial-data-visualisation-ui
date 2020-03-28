import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

import { connectProps} from 'store';

import { DetailsDrawer } from 'routes/components';

import { logout, toggleLoadingTrue } from 'modules/component-props';

import { ReactComponent as LogoutIcon } from 'static/icons/logout.svg';

import { classes } from './style';

const SideBar = ({logout, toggleLoadingTrue}) =>
    <div className={classes.sideBar}>
        <Tooltip title="Logout">
            <IconButton
                aria-label="logout"
                className={classes.logoutBtn}
                onClick={() => {
                    toggleLoadingTrue();
                    logout();
                }}
            >
                <LogoutIcon className={classes.logoutIcon} />
            </IconButton>
        </Tooltip>
        <DetailsDrawer />
    </div>;

export default connectProps(logout, toggleLoadingTrue)(SideBar);