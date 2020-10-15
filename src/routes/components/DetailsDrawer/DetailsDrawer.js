import React from 'react';
import _ from 'lodash';

import { IconButton, Tooltip } from '@material-ui/core';

import { connectProps } from 'store';
import { componentDidMount, componentDidUpdate } from 'hooks';

import { Detail, DetailsGraphs } from './components';

import { regionsView, toggleGraphs, graphsView, getGraphs, toggleLoadingTrue, graphs } from 'modules/component-props';

import { classes } from './style';

import { ReactComponent as GraphIcon } from 'static/icons/timeline.svg';

const DetailsDrawer = ({ regionsView, toggleGraphs, graphsView, getGraphs, toggleLoadingTrue, graphs }) => {

    componentDidMount(() => {
        toggleLoadingTrue();
        getGraphs();
    });

    const isSelected = regionsView.selected && !_.isEmpty(regionsView.selected);
    const featureKeys = isSelected && Object.keys(regionsView.selected).filter(key => key !== 'extent' && key !== 'id')
    const showGraphs = graphsView && graphs && regionsView.selected && Object.keys(graphs.spatial).includes(regionsView.selected.id);
    return (
        <div className={classes.drawerWrapper + ' ' + (isSelected ? classes.active : '') + ' ' + (showGraphs ? classes.graphsView : '')}>
            {isSelected && featureKeys.map((key, index) => (
                <Detail key={index} detailKey={key} value={regionsView.selected[key]} />
            ))}
            {showGraphs && <DetailsGraphs />}
            {regionsView.selected && graphs && Object.keys(graphs.spatial).includes(regionsView.selected.id) && 
                <Tooltip title="Show Graphs">
                    <IconButton
                        aria-label="open-graphs"
                        className={classes.graphBtn}
                        onClick={() => toggleGraphs()}
                    >
                        <GraphIcon className={classes.graphIcon} />
                    </IconButton>
                </Tooltip>
            }
        </div>
    )
};

export default connectProps(regionsView, toggleGraphs, graphsView, getGraphs, toggleLoadingTrue, graphs)(DetailsDrawer);