import {
    hoverStyle,
    clickStyle,
    regionStyle
} from './style';

export const addListeners = (map, updateView) => {
    let selected = null;
    let clickSelected = null;

    map.on('pointermove', e => {
        if (selected !== null && selected !== clickSelected) {
            regionStyle(selected);
            selected = null;
            updateView({
                hoveredFeature: {}
            });
        }
        // console.log(map.getView().getZoom())
        map.forEachFeatureAtPixel(e.pixel, f => {
            selected = f;
            updateView({
                hoveredFeature: {
                    id: f.get("id"),
                    name: f.get("name"),
                    area: Math.round(f.get("area") * 100)/100
                }
            });

            selected !== clickSelected && f.setStyle(hoverStyle(f));
            return true;
        });
      });

    map.on('click', e => {
        console.log(e)
        if (clickSelected !== null) {
            regionStyle(clickSelected);
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
                    name: f.get("name"),
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
