import 'ol/ol.css';
import { Map, View, Feature } from 'ol';
import { Tile as TileLayer, VectorTile as VectorTileLayer} from 'ol/layer';
import { OSM, VectorTile} from 'ol/source';
import MVT from 'ol/format/MVT';
import { Style, Stroke } from 'ol/style';
import {
    hoverStyle,
    clickStyle,
    rasterValStyle,
    colors
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
                    rasterVal: f.get("raster_val"),
                    area: Math.round(f.get("area") * 100)/100
                }
            });

            selected !== clickSelected && f.setStyle(hoverStyle(f));
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
                    rasterVal: f.get("raster_val"),
                    area: Math.round(f.get("area") * 100)/100,
                    extent
                }
            });
            map.getView().fit(extent, {maxZoom: 15, duration: 500})

            f.setStyle(clickStyle(f));
            return true;
        });
      });
};

export const createTileMap = (center, zoom, updateView) => {
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
            new VectorTileLayer({
                source: new VectorTile({
                    format: new MVT({
                        featureClass: Feature
                    }),
                    url: "http://localhost:5000/tiles/{z}/{x}/{y}.pbf"
                }),
                style: feature => rasterValStyle(feature)
            })
        ]
    });
    document.getElementById('map').data = map
    addListeners(map, updateView);
};