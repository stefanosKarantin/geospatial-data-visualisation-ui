import React from 'react';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as LayerVector} from 'ol/layer';
import { Vector as SourceVector} from 'ol/source';

import { connectProps } from 'store';
import { componentDidMount, componentDidUpdate } from 'hooks';
import { getRegions, toggleLoadingTrue, regions, updateView } from 'modules/component-props';

import { regionStyle } from './style';
import { addListeners } from './listeners';

const Regions = ({ getRegions, toggleLoadingTrue, regions, updateView }) => {
    componentDidMount(() => {
        toggleLoadingTrue();
        getRegions();
    });

    componentDidUpdate(() => {
        if (Object.keys(regions).length > 0) {
            const map = document.getElementById('map').data;
            const regionData = regions.map(p => ({
                type: 'Feature',
                properties: {
                    id: p[1],
                    name: p[0],
                    area: p[3]
                },
                geometry: JSON.parse(p[2]),
            }));

            const regionsCollection = {
                type: 'FeatureCollection',
                features: regionData
            };
            const vectorSource = new SourceVector({
                features: (new GeoJSON()).readFeatures(JSON.stringify(regionsCollection))
            });
            const vectorLayer = new LayerVector({
                source: vectorSource,
                style: feature => regionStyle(feature),
                zIndex: 2,
                className: 'regionLayer',

            });
            vectorLayer.on('pointermove', e => {
                console.log(e)
            })
            console.log(map)
            addListeners(map, updateView);
            map.addLayer(vectorLayer)
        }
    }, [regions])
    return (
        <div />
    );
};

export default connectProps(getRegions, toggleLoadingTrue, regions, updateView)(Regions)