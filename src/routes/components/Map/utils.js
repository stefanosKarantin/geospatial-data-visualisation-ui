import _ from 'lodash';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { OSM } from 'ol/source';
import { Tile } from 'ol/layer';

import { componentDidMount } from 'hooks';

export const createMapHook = () => {
    componentDidMount(() => {
        const center = [2646926.76, 4577217.11];
        const zoom = 7;
        createMap(center, zoom)
    });
};

export const createMap = (center, zoom) => {
    const map = new Map({
        target: 'map',
        layers: [
            // new Tile({
            //     source: new OSM()
            // })
        ],
        view: new View({
            center,
            zoom,
            constrainOnlyCenter: true
        })
    });
    document.getElementById('map').data = map
}