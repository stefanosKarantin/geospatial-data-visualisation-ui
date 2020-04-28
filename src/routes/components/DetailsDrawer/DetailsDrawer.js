import React from 'react';
import _ from 'lodash';

import { connectProps } from 'store';
import { Detail, DetailsGraphs } from './components';

import { regionsView } from 'modules/component-props';

import { classes } from './style';

const DetailsDrawer = ({ regionsView }) => {
    const isSelected = regionsView.selected && !_.isEmpty(regionsView.selected);
    const featureKeys = isSelected && Object.keys(regionsView.selected).filter(key => key !== 'extent')
    return (
        <div className={classes.drawerWrapper + ' ' + (isSelected ?  classes.active : '')}>
            {isSelected && featureKeys.map((key, index) => (
                <Detail key={index} detailKey={key} value={regionsView.selected[key]} />
            ))}
            {isSelected && <DetailsGraphs />}
        </div>
    )
};

export default connectProps(regionsView)(DetailsDrawer);