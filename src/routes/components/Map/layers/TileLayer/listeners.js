import {
    hoverStyle,
    clickStyle,
    rasterValStyle,
    colors
} from './style';

export const addListeners = (map, updateView) => {
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
        // console.log(map.getView().getZoom())
        map.forEachFeatureAtPixel(e.pixel, f => {
            if (f.get("raster_val")) {
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
            }
            return false;
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
            if (f.get("raster_val")) {
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
            }
            return false;
        });
      });
};
