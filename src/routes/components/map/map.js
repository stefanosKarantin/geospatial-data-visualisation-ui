import React, { useEffect } from 'react'
import _ from 'lodash';

import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as LayerVector} from 'ol/layer';
import { OSM, TileWMS, Vector as SourceVector} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';

import {
    getToken
} from 'model-services';

import { connectProps } from 'store';

var styles = {
    'Polygon': new Style({
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    })
  };

const styleFunction = (feature) => styles[feature.getGeometry().getType()];

const fetchGeoData = () => (
    new Promise((resolve, reject) => {
        fetch('http://localhost:5000/geo/getcretandata', {
            method: 'POST',
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json'
            }
        })
        .then(response => resolve(response.json()))
        .catch(err => reject(err))
    })
);

const MapBox = () => {

    useEffect(() => {
        // const featuresLayer = new LayerVector({
        //   source: new SourceVector({
        //     features:[],
        //   })
        // });
        fetchGeoData()
        .then(data => {
            const polygons = {
                'type': 'FeatureCollection',
                'crs': {
                  'type': 'name',
                  'properties': {
                    'name': 'EPSG:3857'
                  }
                },
                'features': [{
                    'type': 'Feature',
                    'geometry': {
                        'type': 'GeometryCollection',
                        'geometries': data.polygons.map(p => JSON.parse(p[2]))
                    }
                }]
            };
            console.log(polygons)
            var vectorSource = new SourceVector({
                features: (new GeoJSON()).readFeatures(polygons)
            });

            var vectorLayer = new LayerVector({
                source: vectorSource,
                style: styleFunction
            });

            var map = new Map({
                layers: [
                    new TileLayer({
                        source: new OSM()
                    }),
                    vectorLayer
                ],
                target: 'map',
                view: new View({
                    center: [0, 0],
                    zoom: 2
                })
            });
        })
        .catch(err => console.log(err))

        // const map = new Map({
        //     target: 'map',
        //     layers: [
        //         new TileLayer({
        //             source: new OSM()
        //         }),
        //         new TileLayer({
        //             // extend: [-13884991, 2870341, -7455066, 6338219],
        //             source: new TileWMS({
        //                 url: 'https://ahocevar.com/geoserver/wms',
        //                 params: { 'LAYERS': 'topp:states', 'TILED': true},
        //                 serverType: 'geoserver',
        //                 transition: 400
        //             })
        //         })
        //         // featuresLayer
        //     ],
        //     view: new View({
        //         center: [-10997148, 4569099],
        //         zoom: 4,
        //     })
        // });
    }, []);
    return (
        <div style={{width: '100%'}} id={'map'} />
    );
}

export default connectProps()(MapBox);
