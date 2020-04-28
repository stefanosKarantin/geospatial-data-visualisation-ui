import { pointerMove } from 'ol/events/condition';
import Select from 'ol/interaction/Select';

import {
    hoverStyle,
    clickStyle,
    regionStyle
} from './style';

const selectSingleClick = new Select({
    layers: l => l.getClassName() === 'regions',
    style: clickStyle
});

const  selectPointerMove = new Select({
    condition: pointerMove,
    layers: l => l.getClassName() === 'regions',
    style: hoverStyle
});

export const addListeners = (map, updateView, layer, featureModel ) => {
    
    map.addInteraction(selectPointerMove);
    map.addInteraction(selectSingleClick);

    selectPointerMove.on('select', function(e) {
        const feature = e.selected[0]
        updateView({
            hovered: feature ? featureModel(feature) : {}
        });
    });

    selectSingleClick.on('select', function(e) {
        console.log(e)
        const feature = e.selected[0]
        feature && map.getView().fit(
            feature.getGeometry().getExtent(),
            {
                maxZoom: 15,
                duration: 500
            }
        )

        updateView({
            selected: feature ? featureModel(feature) : {}
        });
    });
};
