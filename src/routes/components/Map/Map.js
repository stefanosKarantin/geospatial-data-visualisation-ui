import React from 'react';
import _ from 'lodash';

import { connectProps } from 'store';

import { hoveredFeature } from 'modules/component-props';

import {
    GeoJsonMap,
    TileMap,
    MapPopup
} from './components';

const MapType = ({type, children}) => {
    switch(type) {
        case 'tile':
            return <TileMap>{children}</TileMap>;
        case 'geojson':
        default:
            return <GeoJsonMap>{children}</GeoJsonMap>;
    };
};

const Map = ({type, hoveredFeature}) =>
    <MapType type={type}>
        {!_.isEmpty(hoveredFeature) && <MapPopup info={hoveredFeature} />}
    </MapType>;

export default connectProps(hoveredFeature)(Map);