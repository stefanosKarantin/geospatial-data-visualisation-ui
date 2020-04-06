import React from 'react';
import _ from 'lodash';

import { connectProps } from 'store';

import { hoveredFeature, toggleLoadingTrue, updateView, geodata, getGeoData } from 'modules/component-props';

import { createMapHook } from './utils';

import {
    MapPopup,
    Filters
} from './components';

import {
    Regions,
    GeoJsonLayer,
    TileLayer
} from './layers';

const FeatureLayer = ({featureType}) => {
    switch(featureType) {
        case 'tile':
            return <TileLayer />;
        case 'geojson':
        default:
            return <GeoJsonLayer />;
    };
};

const Map = ({ featureType }) => {
    createMapHook();
    return (
        <div style={{width: '100%', position: 'relative'}}>
            <div style={{width: '100%', height: '100%'}} id={'map'} />
            <Regions />
            <Filters />
            <FeatureLayer featureType={featureType} />
            <MapPopup />
        </div>
    );
}

export default connectProps()(Map);