import React from 'react';
import _ from 'lodash';

import { connectProps } from 'store';
import { Detail, DetailsGraphs } from './components';

import { selectedFeature } from 'modules/component-props';

import { classes } from './style';

const DetailsDrawer = ({selectedFeature}) => {
    const isSelected = selectedFeature && !_.isEmpty(selectedFeature);
    const featureKeys = selectedFeature && Object.keys(selectedFeature).filter(key => key !== 'extent')
    return (
        <div className={classes.drawerWrapper + ' ' + (isSelected ?  classes.active : '')}>
            {isSelected && featureKeys.map((key, index) => (
                <Detail key={index} detailKey={key} value={selectedFeature[key]} />
            ))}
            {isSelected && <DetailsGraphs />}
        </div>
    )
};

export default connectProps(selectedFeature)(DetailsDrawer);