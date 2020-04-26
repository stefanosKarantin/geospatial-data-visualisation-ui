import React from 'react';
import _ from 'lodash';

import { connectProps } from 'store';
import { Detail, DetailsGraphs } from './components';

import { regionsView } from 'modules/component-props';

import { classes } from './style';

const DetailsDrawer = ({ regionsView }) => {
    const isSelected = regionsView.selected && !_.isEmpty(selectedFeature.selected);
    const featureKeys = isSelected && Object.keys(selectedFeature.selected).filter(key => key !== 'extent')
    return (
        <div className={classes.drawerWrapper + ' ' + (isSelected ?  classes.active : '')}>
            {isSelected && featureKeys.map((key, index) => (
                <Detail key={index} detailKey={key} value={selectedFeature.selected[key]} />
            ))}
            {isSelected && <DetailsGraphs />}
        </div>
    )
};

export default connectProps(regionsView)(DetailsDrawer);