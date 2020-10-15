import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

import { connectProps} from 'store';

import { DetailsDrawer, RegionSelection } from 'routes/components';

import { logout, toggleLoadingTrue, graphsView, graphs, regionsView } from 'modules/component-props';

import { ReactComponent as LogoutIcon } from 'static/icons/logout.svg';

import { classes } from './style';

const SideBar = ({logout, toggleLoadingTrue, graphsView, graphs, regionsView}) => {
    const showGraphs = graphsView && graphs && regionsView.selected && Object.keys(graphs.spatial).includes(regionsView.selected.id);
    return (
        <div className={classes.sideBar + ' ' + (showGraphs ? classes.graphsSideBar : '')}>
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
            <RegionSelection />
            <DetailsDrawer />
        </div>    
    )
}

export default connectProps(logout, toggleLoadingTrue, graphsView, graphs, regionsView)(SideBar);