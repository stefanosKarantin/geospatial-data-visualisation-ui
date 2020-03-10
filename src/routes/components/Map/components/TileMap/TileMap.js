import React, { useEffect } from 'react'

import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, VectorTile as VectorLayerTile} from 'ol/layer';
import { OSM, VectorTile} from 'ol/source';
import MVT from 'ol/format/MVT';
import { Style, Stroke } from 'ol/style';

import { connectProps } from 'store';

const createTileMap = (center, zoom) => {
    const map = new Map({
        target: "map",
        view: new View({
            // projection: 'EPSG:4326',
            center,
            zoom
        }),
        layers: [
            new TileLayer({
                source: new OSM()
            }),
            new VectorLayerTile({
                source: new VectorTile({
                    format: new MVT(),
                    url: "http://localhost:5000/tiles/{z}/{x}/{y}"
                }),
                style: function(feature, res) {
                    return new Style({
                        stroke: new Stroke({
                            width: 3,
                            color: 'red'
                        })
                    })
                }
            })
        ]
    });
    document.getElementById('map').data = map
};


const TileMap = () => {
    useEffect(() => {
        const center = [2851926.76, 4187217.11];
        // const center = [25.743713, 35.196256]
        const zoom = 8;
        createTileMap(center, zoom);
    }, [])
    return (
        <div style={{width: '100%'}} id={'map'} />
    );
}

export default connectProps()(TileMap);
