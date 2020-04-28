
import React from 'react';
import { Feature, Tile } from 'ol';
import { VectorTile as VectorTileLayer} from 'ol/layer';
import { VectorTile } from 'ol/source';
import MVT from 'ol/format/MVT';

import { connectProps } from 'store';
import { componentDidMount } from 'hooks';
import { updateFieldsView } from 'modules/component-props';

import { rasterValStyle } from './style';
import { addListeners } from './listeners';

const fieldModel = f => ({
    id: f.get("id"),
    rasterVal: f.get("raster_val"),
    area: Math.round(f.get("area") * 100)/100
});

const TileLayer = ({ updateFieldsView }) => {
    componentDidMount(() => {
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
            className: 'fields'
        });

        map.addLayer(tileLayer);
        addListeners(map, updateFieldsView, 'fields', fieldModel);
    });
    return (
        <div />
    );
};

export default connectProps(updateFieldsView)(TileLayer)