import React, { useEffect } from 'react'
import _ from 'lodash';

import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as LayerVector} from 'ol/layer';
import { OSM, TileWMS, Vector as SourceVector} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';

import { connectProps } from 'store';

import {
    geodata,
    filters,
    toggleLoadingTrue,
    getGeoData
} from 'modules/component-props';

const createGeoJsonMap = (center, zoom) => {
    const vectorSource = new SourceVector();
    const vectorLayer = new LayerVector({
        source: vectorSource,
    });
    const map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
                source: new OSM()
            }),
            vectorLayer
        ],
        view: new View({
            projection: 'EPSG:4326',
            center,
            zoom
        })
    });
    document.getElementById('map').data = map
};

const GeoJsonMap = ({
    geodata,
    filters,
    toggleLoadingTrue,
    getGeoData
}) => {
    useEffect(() => {
        toggleLoadingTrue();
        getGeoData();
        const center = [25.743713, 35.196256];
        const zoom = 11;
        createGeoJsonMap(center, zoom);
    }, [])

    useEffect(() => {
        if (!_.isEmpty(geodata)) {
            const rasterFilters = _.filter(filters, f => f.checked).map(f => f.value);
            const filteredData = geodata.filter(g => rasterFilters.includes(g[1])).map(p => JSON.parse(p[2]))
            const polygons = {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'GeometryCollection',
                        geometries: filteredData
                    }
                }]
            };

            document.getElementById('map').data.getLayers().forEach(layer => {

                if (layer instanceof LayerVector) {
                    layer.getSource().clear()
                    layer.getSource().addFeatures((new GeoJSON()).readFeatures(JSON.stringify(polygons)))
                //     layer.getSource().getFeatures().forEach(f => {
                //         console.log(f)
                //     })
                }
            });
        }
    }, [geodata, filters]);
    return (
        <div style={{width: '100%'}} id={'map'} />
    );
}

export default connectProps(geodata, filters, toggleLoadingTrue, getGeoData)(GeoJsonMap);
