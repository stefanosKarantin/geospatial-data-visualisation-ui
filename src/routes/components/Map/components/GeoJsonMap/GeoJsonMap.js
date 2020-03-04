import React, { useEffect } from 'react'
import _ from 'lodash';

import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as LayerVector} from 'ol/layer';
import { OSM, TileWMS, Vector as SourceVector} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke}from 'ol/style'
import { connectProps } from 'store';
import Select from 'ol/interaction/Select';
import { click, pointerMove } from 'ol/events/condition';
import Collection from 'ol/Collection';

import {
    geodata,
    filters,
    toggleLoadingTrue,
    getGeoData
} from 'modules/component-props';

const highlightStyle = new Style({
    fill: new Fill({
        color: 'rgba(255,255,255,0.7)'
    }),
    stroke: new Stroke({
        color: '#046098',
        width: 3
    })
});

const highlightClickedStyle = new Style({
    fill: new Fill({
        color: 'rgba(255,255,255,0.7)'
    }),
    stroke: new Stroke({
        color: '#052d45',
        width: 3
    })
});

const rasterValStyle = (feature) => {
    const colors = ["#E9967A", "#DAA520", "#800080", "#00008B", "#FF0000", "#BC8F8F", "#2F4F4F", "#FFE4C4", "#F4A460"]

    feature.setStyle(new Style({
        stroke: new Stroke({
            color: colors[feature.get("rasterVal")],
            width: 5
        })
    }));
};

const createGeoJsonMap = (center, zoom) => {
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
            projection: 'EPSG:4326',
            center,
            zoom
        })
    });
    document.getElementById('map').data = map

    let selected = null;
    let clickSelected = null;
    const status = document.getElementById('status');

    map.on('pointermove', e => {
        if (selected !== null && selected !== clickSelected) {
            selected.setStyle(undefined);
            selected = null;
        }

        map.forEachFeatureAtPixel(e.pixel, f => {
            selected = f;
            selected !== clickSelected && f.setStyle(highlightStyle);
            return true;
        });

        if (selected) {
            status.innerHTML = '&nbsp;Hovering: ' + selected.get('name');
        } else {
            status.innerHTML = '&nbsp;';
        }
      });

      map.on('click', e => {
        if (clickSelected !== null) {
            clickSelected.setStyle(undefined);
            clickSelected = null;
        }

        map.forEachFeatureAtPixel(e.pixel, f => {
            console.log(e)
            console.log("-------")
            console.log(f)

            clickSelected = f;
            f.setStyle(highlightClickedStyle);
            return true;
        });

        if (clickSelected) {
            status.innerHTML = '&nbsp;Hovering: ' + clickSelected.get('name');
        } else {
            status.innerHTML = '&nbsp;';
        }
      });
    const select = null; // ref to currently selected interaction

    // select interaction working on "singleclick"
    const selectSingleClick = new Select();

    // select interaction working on "click"
    const selectClick = new Select({
        condition: click
    });

    // select interaction working on "pointermove"
    const selectPointerMove = new Select({
        condition: pointerMove
    });

    const selectElement = document.getElementById('type');

    const changeInteraction = function() {
    if (select !== null) {
        map.removeInteraction(select);
    }
    const value = selectElement.value;
    if (value == 'singleclick') {
        select = selectSingleClick;
    } else if (value == 'click') {
        select = selectClick;
    } else if (value == 'pointermove') {
        select = selectPointerMove;
    } else {
        select = null;
    }
    if (select !== null) {
        map.addInteraction(select);
        select.on('select', function(e) {
        document.getElementById('status').innerHTML = '&nbsp;' +
            e.target.getFeatures().getLength() +
            ' selected features (last operation selected ' + e.selected.length +
            ' and deselected ' + e.deselected.length + ' features)';
        });
    }
    };
};

const GeoJsonMap = ({
    geodata,
    filters,
    toggleLoadingTrue,
    getGeoData
}) => {
    useEffect(() => {
        toggleLoadingTrue();
        getGeoData();
        const center = [25.743713, 35.196256];
        const zoom = 11;
        createGeoJsonMap(center, zoom);
    }, [])

    useEffect(() => {
        if (!_.isEmpty(geodata)) {
            const rasterFilters = _.filter(filters, f => f.checked).map(f => f.value);
            const filteredData = geodata.filter(g => rasterFilters.includes(g[1])).map(p => ({
                type: 'Feature',
                properties: {
                    rasterVal: p[1]
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
                    // layer.getSource().addFeatures((new GeoJSON()).readFeatures(polygons))
                    layer.getSource().getFeatures().forEach(rasterValStyle)

                //     layer.getSource().getFeatures().forEach(f => {
                //         console.log(f)
                //     })
                }
            });
        }
    }, [geodata, filters]);
    return (
        <div style={{width: '100%'}}>
            <div style={{width: '100%', height: '100%'}} id={'map'} />
            <span id={'status'} />
        </div>
    );
}

export default connectProps(geodata, filters, toggleLoadingTrue, getGeoData)(GeoJsonMap);
