
import React from 'react';
import { Feature } from 'ol';
import { VectorTile as VectorTileLayer} from 'ol/layer';
import { VectorTile } from 'ol/source';
import MVT from 'ol/format/MVT';

import { connectProps } from 'store';
import { componentDidMount } from 'hooks';
import { updateFieldsView } from 'modules/component-props';

import { cropStyle } from './style';
import { addListeners } from './listeners';

const tilesUrl =  process.env.NODE_ENV === 'development'
    ? "http://localhost:5000/crops/{z}/{x}/{y}.pbf"
    : `${window.location.protocol}//${window.location.host}/api/crops/{z}/{x}/{y}.pbf`

const fieldModel = f => ({
    id: f.get("objectid"),
    ct_conf: f.get("ct_conf"),
    ct_decl: f.get("ct_decl"),
    ct_pred: f.get("ct_pred"),
    s1pix: f.get("s1pix"),
    s2pix: f.get("s2pix"),
    area: Math.round(f.get("shape_area") * 100)/100,
    perimeter: Math.round(f.get("shape_leng") * 100)/100
});

const Crops = ({ updateFieldsView }) => {
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
            style: feature => cropStyle(feature),
            zIndex: 3,
            className: 'crops'
        });

        map.addLayer(tileLayer);
        addListeners(map, updateFieldsView, 'crops', fieldModel);
    });
    return (
        <div />
    );
};

export default connectProps(updateFieldsView)(Crops)