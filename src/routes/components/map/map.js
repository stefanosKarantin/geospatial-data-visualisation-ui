import React, { useEffect } from 'react'
import _ from 'lodash';

import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as LayerVector} from 'ol/layer';
import { OSM, TileWMS, Vector as SourceVector} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import {fromLonLat} from 'ol/proj';
import {
    getToken
} from 'model-services';

import { connectProps } from 'store';

const image = new CircleStyle({
    radius: 1,
    fill: null,
    stroke: new Stroke({color: 'red', width: 1})
  });

const styles = {
    'Point': new Style({
        image: image
    }),
    'LineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiLineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiPoint': new Style({
        image: image
    }),
    'MultiPolygon': new Style({
        stroke: new Stroke({
            color: 'yellow',
            width: 1
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        })
    }),
    'Polygon': new Style({
        stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    }),
    'GeometryCollection': new Style({
        stroke: new Stroke({
            color: 'magenta',
            width: 2
        }),
        fill: new Fill({
            color: 'magenta'
        }),
        image: new CircleStyle({
            radius: 1000,
            fill: null,
            stroke: new Stroke({
                color: 'magenta'
            })
        })
    }),
    'Circle': new Style({
        stroke: new Stroke({
            color: 'red',
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    })
};


const styleFunction = feature => styles[feature.getGeometry().getType()];

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
        fetchGeoData()
        .then(data => {
            const polygons = {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    geometry: {
                        type: 'GeometryCollection',
                        geometries: data.polygons.map(p => JSON.parse(p[2]))
                    }
                }]
            };
            console.log(polygons)
            const vectorSource = new SourceVector({
                features: (new GeoJSON()).readFeatures(JSON.stringify(polygons))
            });

            const vectorLayer = new LayerVector({
                source: vectorSource,
                // style: styleFunction
            });

            // const map = new Map({
            //     target: 'map',
            //     layers: [
            //         new TileLayer({
            //             source: new OSM()
            //         }),
            //         vectorLayer
            //     ],
            //     view: new View({
            //         projection: 'EPSG:4326',
            //         center: [25.743713, 35.196256],
            //         zoom: 10
            //         // multiWorld: true
            //     })
            // });
        })
        .catch(err => console.log(err))

        const featuresLayer = new LayerVector({
          source: new SourceVector({
            features:[],
          })
        });
        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                new TileLayer({
                    // extend: [-13884991, 2870341, -7455066, 6338219],
                    source: new TileWMS({
                        url: 'https://ahocevar.com/geoserver/wms',
                        params: { 'LAYERS': 'topp:states', 'TILED': true},
                        serverType: 'geoserver',
                        transition: 400
                    })
                })
                // featuresLayer
            ],
            view: new View({
                center: [-10997148, 4569099],
                zoom: 4,
            })
        });
    }, []);
    return (
        <div style={{width: '100%'}} id={'map'} />
    );
}

export default connectProps()(MapBox);
