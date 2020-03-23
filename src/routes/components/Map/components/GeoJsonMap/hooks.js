import { Vector as LayerVector} from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import _ from 'lodash';

import { componentDidMount, componentDidUpdate } from 'hooks';
import { createGeoJsonMap } from './utils';
import { rasterValStyle } from '../utils';

export const createGeoJsonHook = (
    toggleLoadingTrue,
    getGeoData,
    updateView,
) => {
    componentDidMount(() => {
        toggleLoadingTrue();
        getGeoData();
        // const center = [25.743713, 35.196256];
        const center = [2851926.76, 4187217.11];
        const zoom = 11;
        createGeoJsonMap(center, zoom, updateView);
    });
};

export const filterFieldsHook = (geodata, filters) => {
    componentDidUpdate(() => {
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
                    layer.getSource().getFeatures().forEach(rasterValStyle)
                }
            });
        }
    }, [geodata, filters]);
};

