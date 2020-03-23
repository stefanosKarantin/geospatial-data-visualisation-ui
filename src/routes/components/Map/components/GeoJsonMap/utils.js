import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile, Vector as LayerVector} from 'ol/layer';
import { OSM, Vector as SourceVector} from 'ol/source';

import {
    hoverStyle,
    clickStyle,
    rasterValStyle
} from '../utils';

const addListeners = (map, updateView) => {
    let selected = null;
    let clickSelected = null;

    map.on('pointermove', e => {
        if (selected !== null && selected !== clickSelected) {
            rasterValStyle(selected);
            selected = null;
            updateView({
                hoveredFeature: {}
            });
        }

        map.forEachFeatureAtPixel(e.pixel, f => {
            selected = f;
            updateView({
                hoveredFeature: {
                    id: f.get("id"),
                    rasterVal: f.get("rasterVal"),
                    area: Math.round(f.get("area") * 100)/100
                }
            });
            const fill = f.getStyle().fill_
            selected !== clickSelected && f.setStyle(hoverStyle(fill));
            return true;
        });
      });

      map.on('click', e => {
        if (clickSelected !== null) {
            rasterValStyle(clickSelected);
            clickSelected = null;
            updateView({
                selectedFeature: {}
            });
        }

        map.forEachFeatureAtPixel(e.pixel, f => {
            clickSelected = f;

            const extent = f.getGeometry().getExtent();
            updateView({
                selectedFeature: {
                    id: f.get("id"),
                    rasterVal: f.get("rasterVal"),
                    area: Math.round(f.get("area") * 100)/100,
                    extent
                }
            });
            map.getView().fit(extent, {maxZoom: 15, duration: 500})
            const fill = f.getStyle().fill_
            f.setStyle(clickStyle(fill));
            return true;
        });
      });
};
export const createGeoJsonMap = (center, zoom, updateView) => {
    const vectorSource = new SourceVector();
    const vectorLayer = new LayerVector({
        source: vectorSource,
    });
    const map = new Map({
        target: 'map',
        layers: [
            new Tile({
                source: new OSM()
            }),
            vectorLayer
        ],
        view: new View({
            // projection: 'EPSG:4326',
            center,
            zoom,
            constrainOnlyCenter: true
        })
    });
    document.getElementById('map').data = map
    addListeners(map, updateView);
};