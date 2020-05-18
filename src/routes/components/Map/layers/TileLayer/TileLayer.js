
import React from 'react';
import { Feature } from 'ol';
import { VectorTile as VectorTileLayer} from 'ol/layer';
import { VectorTile } from 'ol/source';
import MVT from 'ol/format/MVT';

import { connectProps } from 'store';
import { componentDidMount } from 'hooks';
import { updateFieldsView } from 'modules/component-props';

import { rasterValStyle } from './style';
import { addListeners } from './listeners';

const tilesUrl =  process.env.NODE_ENV === 'development'
    ? "http://localhost:5000/tiles/{z}/{x}/{y}.pbf"
    : `${window.location.protocol}//${window.location.host}/api/tiles/{z}/{x}/{y}.pbf`

const fieldModel = f => ({
    id: f.get("id"),
    rasterVal: f.get("raster_val"),
    area: Math.round(f.get("area") * 100)/100
});

const TileLayer = ({ updateFieldsView }) => {
    componentDidMount(() => {
        const map = document.getElementById('map').data;
        const source = new VectorTile({
            format: new MVT({
                featureClass: Feature
            }),
            url: tilesUrl
        })
        const tileLayer = new VectorTileLayer({
            source,
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