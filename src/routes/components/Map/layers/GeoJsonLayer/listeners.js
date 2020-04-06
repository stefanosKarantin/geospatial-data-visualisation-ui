import { Vector as LayerVector} from 'ol/layer';

import {
    hoverStyle,
    clickStyle,
    rasterValStyle
} from './style';

export const addListeners = (map, updateView) => {
    let hovered = null;
    let clickSelected = null;

    map.on('pointermove', e => {
        if (hovered !== null && hovered !== clickSelected) {
            rasterValStyle(hovered);
            hovered = null;
            updateView({
                hoveredFeature: {}
            });
        }

        map.forEachLayerAtPixel(e.pixel, layer => {
            if (layer instanceof LayerVector) {
                map.forEachFeatureAtPixel(e.pixel, f => {

                    if (f.get('raster_val')) {
                        updateView({
                            hoveredFeature: {
                                id: f.get("id"),
                                rasterVal: f.get("raster_val"),
                                area: Math.round(f.get("area") * 100)/100
                            }
                        })
                        hovered = f;
                        hovered !== clickSelected && f.setStyle(hoverStyle(f));
                    }
                    return true;
                });
            };
            return true;
        });
    })

    map.on('click', e => {
        if (clickSelected !== null) {
            rasterValStyle(clickSelected);
            clickSelected = null;
            updateView({
                selectedFeature: {}
            });
        }
        map.forEachLayerAtPixel(e.pixel, layer => {
            if (layer instanceof LayerVector) {
                map.forEachFeatureAtPixel(e.pixel, f => {
                    if (f.get('raster_val')) {
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
                    };
                    return true;
                });
            }
            return true;
        });
    });
};
