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

import { getGeoData, geodata, filters } from 'modules/component-props';

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

const MapBox = ({ geodata, filters }) => {
    useEffect(() => {
        const vectorSource = new SourceVector({
            // features: (new GeoJSON()).readFeatures(JSON.stringify(polygons))
        });
        const vectorLayer = new LayerVector({
            source: vectorSource,
            // style: styleFunction
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
                center: [25.743713, 35.196256],
                zoom: 11
            })
        });
        document.getElementById('map').data = map
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
            console.log(filteredData)
            // const vectorSource = new SourceVector();

            document.getElementById('map').data.getLayers().forEach(layer => {
                if (layer instanceof LayerVector) {
                    // layer.setSource(vectorSource.addFeatures((new GeoJSON()).readFeatures(JSON.stringify(polygons))))
                    layer.getSource().addFeatures((new GeoJSON()).readFeatures(JSON.stringify(polygons)))
                    // console.log(layer.getSource())
                    // console.log(layer.getSource().getFeatures())
                    layer.getSource().getFeatures().forEach(f => {
                        // layer.getSource().removeFeature(f.ol_uid)
                        console.log(f)
                        f.setId('12345')
                        console.log(f.getId())
                        layer.getSource().removeFeature('12345')
                    })
                }
            });
        }
    }, [geodata, filters]);
    return (
        <div style={{width: '100%'}} id={'map'} />
    );
}

export default connectProps(getGeoData, geodata, filters)(MapBox);
