import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as LayerVector} from 'ol/layer';
import { OSM, Vector as SourceVector} from 'ol/source';
import { Style, Fill, Stroke}from 'ol/style';

export const colors = ["#E9967A", "#DAA520", "#800080", "#00008B", "#FF0000", "#BC8F8F", "#55BADA", "#FFE4C4", "#F4A460"]

const hoverStyle = fill => new Style({
    fill,
    stroke: new Stroke({
        color: '#001852',
        opacity: '0.5',
        width: 3
    })
});

const clickStyle = fill => new Style({
    fill,
    stroke: new Stroke({
        color: '#001852',
        opacity: '1',
        width: 3
    })
});

export const rasterValStyle = feature => {
    const style = new Style({
        fill: new Fill({
            color: colors[feature.get("rasterVal")]
        }),
        stroke: new Stroke({
            color: colors[feature.get("rasterVal")],
            opacity: 1,
            width: 1
        })
    });

    feature.setStyle(style);
};

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
                    area: f.get("area")
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
            updateView({
                selectedFeature: {
                    id: f.get("id"),
                    rasterVal: f.get("rasterVal"),
                    area: f.get("area")
                }
            });
            const fill = f.getStyle().fill_
            f.setStyle(clickStyle(fill));
            return true;
        });
      });
}
export const createGeoJsonMap = (center, zoom, updateView) => {
    const vectorSource = new SourceVector();
    const vectorLayer = new LayerVector({
        source: vectorSource,
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
            // projection: 'EPSG:4326',
            center,
            zoom
        })
    });
    document.getElementById('map').data = map
    addListeners(map, updateView);
};