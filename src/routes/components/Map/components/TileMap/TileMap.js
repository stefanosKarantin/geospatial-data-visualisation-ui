import React, { useEffect } from 'react'

import 'ol/ol.css';

import { connectProps } from 'store';

import {
    // geodata,
    // filters,
    // toggleLoadingTrue,
    // getGeoData,
    // selectedFeature,
    updateView
} from 'modules/component-props';

// import {
//     createGeoJsonHook,
//     filterFieldsHook
// } from './hooks';

import { createTileMap } from './utils.js';

const TileMap = ({updateView, children}) => {
    useEffect(() => {
        const center = [2866926.76, 4187217.11];
        // const center = [25.743713, 35.196256]
        const zoom = 11;
        createTileMap(center, zoom, updateView);
    }, [])
    return (
        <div style={{width: '100%', position: 'relative'}}>
            <div style={{width: '100%', height: '100%'}} id={'map'} />
            {children}
        </div>
    );
}

export default connectProps(updateView)(TileMap);
