import React from 'react';
import _ from 'lodash';

import { Vector as LayerVector} from 'ol/layer';
import { Vector as SourceVector} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';

import { connectProps } from 'store';
import { componentDidMount, componentDidUpdate } from 'hooks';

import {
    updateView,
    geodata,
    toggleLoadingTrue,
    getGeoData
} from 'modules/component-props';

import {
    hoverStyle,
    clickStyle,
    rasterValStyle
} from './style';

import { addListeners } from './listeners';

const GeoJsonLayer = ({
    updateView,
    geodata,
    getGeoData,
    toggleLoadingTrue
}) => {
    componentDidMount(() => {
        toggleLoadingTrue();
        getGeoData();
    });
    componentDidUpdate(() => {
        if (!_.isEmpty(geodata)) {
            // const rasterFilters = _.filter(filters, f => f.checked).map(f => f.value);
            const filteredData = geodata.map(p => ({
                type: 'Feature',
                properties: {
                    id: p[0],
                    raster_val: p[1],
                    area: p[3]
                },
                geometry: JSON.parse(p[2]),
            }));

            const polygons = {
                type: 'FeatureCollection',
                features: filteredData
            };
            const vectorSource = new SourceVector({
                features: (new GeoJSON()).readFeatures(JSON.stringify(polygons))
            });
            const vectorLayer = new LayerVector({
                className: 'geoJsonLayer',
                source: vectorSource,
                style: feature => rasterValStyle(feature),
            });

            const map = document.getElementById('map').data

            map.addLayer(vectorLayer)
            addListeners(map, updateView, vectorLayer);
        }
    }, [geodata])
    return (
        <div />
    )
};

export default connectProps(updateView, geodata, getGeoData, toggleLoadingTrue)(GeoJsonLayer);