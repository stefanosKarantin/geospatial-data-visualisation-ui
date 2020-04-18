
import React from 'react';
import { Feature, Tile } from 'ol';
import { VectorTile as VectorTileLayer} from 'ol/layer';
import { VectorTile } from 'ol/source';
import MVT from 'ol/format/MVT';

import { connectProps } from 'store';
import { componentDidMount } from 'hooks';
import { updateView } from 'modules/component-props';

import { rasterValStyle } from './style';
import { addListeners } from './listeners';

const TileLayer = ({ updateView }) => {
    componentDidMount(() => {
        // setTimeout(() => {
            const map = document.getElementById('map').data;
            const tileLayer = new VectorTileLayer({
                source: new VectorTile({
                    format: new MVT({
                        featureClass: Feature
                    }),
                    url: "http://localhost:5000/tiles/{z}/{x}/{y}.pbf"
                }),
                style: feature => rasterValStyle(feature),
                zIndex: 3,
                className: 'tiles'
            });

            map.addLayer(tileLayer);
            addListeners(map, updateView);
        // }, 500)
    });
    return (
        <div />
    )
};

export default connectProps(updateView)(TileLayer)