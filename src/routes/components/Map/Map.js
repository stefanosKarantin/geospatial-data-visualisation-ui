import React from 'react'

import {
    GeoJsonMap,
    TileMap,
} from './components';

export const Map = ({type}) => {
    switch(type) {
        case 'tile':
            return <TileMap />;
        case 'geojson':
        default:
            return <GeoJsonMap />;
    };
};