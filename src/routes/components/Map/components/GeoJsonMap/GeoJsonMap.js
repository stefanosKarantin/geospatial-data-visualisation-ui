import React from 'react'
import _ from 'lodash';

import 'ol/ol.css';

import { connectProps } from 'store';
import { selectedFeature, updateView } from 'modules/component-props';
import {
    geodata,
    filters,
    toggleLoadingTrue,
    getGeoData
} from 'modules/component-props';

import {
    createGeoJsonHook,
    filterFieldsHook
} from './hooks';

const GeoJsonMap = ({
    geodata,
    filters,
    toggleLoadingTrue,
    getGeoData,
    // selectedFeature,
    updateView,
    children
}) => {
    createGeoJsonHook(
        toggleLoadingTrue,
        getGeoData,
        updateView,
    );
    filterFieldsHook(geodata, filters);
    return (
        <div style={{width: '100%', position: 'relative'}}>
            <div style={{width: '100%', height: '100%'}} id={'map'} />
             {children}
        </div>
    );
}

export default connectProps(
    selectedFeature,
    updateView,
    geodata,
    filters,
    toggleLoadingTrue,
    getGeoData
)(GeoJsonMap);
