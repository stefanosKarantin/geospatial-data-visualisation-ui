import React, { useEffect } from 'react'
import _ from 'lodash';

import 'ol/ol.css';
import { Vector as LayerVector} from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';

import { connectProps } from 'store';
import { selectedFeature, updateView } from 'modules/component-props';
import { rasterValStyle, createGeoJsonMap } from '../utils';

import {
    geodata,
    filters,
    toggleLoadingTrue,
    getGeoData
} from 'modules/component-props';

const GeoJsonMap = ({
    geodata,
    filters,
    toggleLoadingTrue,
    getGeoData,
    selectedFeature,
    updateView,
    children
}) => {
    useEffect(() => {
        toggleLoadingTrue();
        getGeoData();
        // const center = [25.743713, 35.196256];
        const center = [2851926.76, 4187217.11];
        const zoom = 11;
        createGeoJsonMap(center, zoom, updateView);
    }, [])

    useEffect(() => {
        if (!_.isEmpty(geodata)) {
            const rasterFilters = _.filter(filters, f => f.checked).map(f => f.value);
            const filteredData = geodata.filter(g => rasterFilters.includes(g[1])).map(p => ({
                type: 'Feature',
                properties: {
                    id: p[0],
                    rasterVal: p[1],
                    area: p[3]
                },
                geometry: JSON.parse(p[2]),
            }));

            const polygons = {
                type: 'FeatureCollection',
                features: filteredData
            };

            document.getElementById('map').data.getLayers().forEach(layer => {

                if (layer instanceof LayerVector) {
                    layer.getSource().clear()
                    layer.getSource().addFeatures((new GeoJSON()).readFeatures(JSON.stringify(polygons)))
                    // layer.getSource().addFeatures((new GeoJSON()).readFeatures(polygons))
                    layer.getSource().getFeatures().forEach(rasterValStyle)

                //     layer.getSource().getFeatures().forEach(f => {
                //         console.log(f)
                //     })
                }
            });
        }
    }, [geodata, filters]);
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
