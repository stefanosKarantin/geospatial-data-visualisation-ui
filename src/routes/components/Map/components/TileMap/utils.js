import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, VectorTile as VectorLayerTile} from 'ol/layer';
import { OSM, VectorTile} from 'ol/source';
import MVT from 'ol/format/MVT';
import { Style, Stroke } from 'ol/style';
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
            console.log(f)
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
            new VectorLayerTile({
                source: new VectorTile({
                    format: new MVT(),
                    url: "http://localhost:5000/tiles/{z}/{x}/{y}.mvt"
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
    addListeners(map, updateView);
};