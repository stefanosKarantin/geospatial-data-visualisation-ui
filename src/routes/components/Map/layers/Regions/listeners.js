import _ from 'lodash';
import { Vector as LayerVector} from 'ol/layer';

import {
    hoverStyle,
    clickStyle,
    regionStyle
} from './style';

export const addListeners = (map, updateView, layer, featureModel ) => {
    // let hoverSelected = null;
    // let clickSelected = null;

    map.on('pointermove', e => {
    //     if (hoverSelected !== null && hoverSelected !== clickSelected) {
    //         !(hoverSelected.get('state') === 'selected') && regionStyle(hoverSelected);
    //         hoverSelected = null;
    //         updateView({
    //             hoveredFeature: {}
    //         });
    //     }
        // console.log(map.getView().getZoom())
        map.forEachFeatureAtPixel(e.pixel, f => {
            // hoverSelected = f;
            if (!(f.get('state') === 'hovered' || f.get('state') === 'selected'))
            updateView({
                [`${layer}View`]: {
                    hovered: featureModel
                }
                    // id: f.get("id"),
                    // name: f.get("name"),
                    // area: Math.round(f.get("area") * 100)/100
                
            });
            f.set
            // hoverSelected !== clickSelected && f.setStyle(hoverStyle(f));
            return true;
        }, {
            layerFilter: fc => fc.getClassName === 'region'
        });
    });

    map.on('click', e => {
        // map.getLayers().getArray().map(l => {
        //     if (l instanceof LayerVector) {
        //         const features = l.getSource().getFeatures()
        //         const f = _.find(features, f => f.get('state') === 'selected')
        //         console.log(f)
        //         clickSelected = f || clickSelected;
        //         return true;
        //     }
        // });
        // if (clickSelected !== null) {
        //     console.log(clickSelected)
        //     regionStyle(clickSelected);
        //     clickSelected.set('state', 'deselected')
        //     clickSelected = null;
        //     updateView({
        //         selectedFeature: {}
        //     });
        // }

        // map.forEachFeatureAtPixel(e.pixel, f => {
        //     f.set('state', 'selected');
        //     clickSelected = f;

        //     const extent = f.getGeometry().getExtent();
        //     updateView({
        //         selectedFeature: {
        //             id: f.get("id"),
        //             name: f.get("name"),
        //             area: Math.round(f.get("area") * 100)/100,
        //             extent
        //         }
        //     });

        //     map.getView().fit(extent, {maxZoom: 15, duration: 500})

        //     f.setStyle(clickStyle(f));
        //     return true;
        // });
    });
};
