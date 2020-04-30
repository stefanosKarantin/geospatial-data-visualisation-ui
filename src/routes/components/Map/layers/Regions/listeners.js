import { pointerMove, click } from 'ol/events/condition';
import Select from 'ol/interaction/Select';

import {
    hoverStyle,
    clickStyle,
    regionStyle
} from './style';

const selectSingleClick = new Select({
    layers: l => l.getClassName() === 'regions',
    style: regionStyle,
    // condition: click
});

const  selectPointerMove = new Select({
    // toggleCondition: e => e instanceof singleClick,
    condition: pointerMove,
    layers: l => l.getClassName() === 'regions',
    style: hoverStyle
});

export const addListeners = (map, updateView, layer, featureModel ) => {
    
    map.addInteraction(selectPointerMove);
    map.addInteraction(selectSingleClick);

    selectPointerMove.on('select', function(e) {
        const selected = selectSingleClick.getFeatures().getArray()[0]
        selected && selected.setStyle(clickStyle(selected))

        const feature = e.selected[0]
        updateView({
            hovered: feature ? featureModel(feature) : {}
        });
    });

    selectSingleClick.on('select', function(e) {
        const feature = e.selected[0]
        const deselected = e.deselected && e.deselected[0]
        deselected &&
        deselected.setStyle(regionStyle(deselected))
        feature &&
        feature.setStyle(clickStyle(feature))
        feature &&
        map.getView().fit(
            feature.getGeometry().getExtent(),
            {
                maxZoom: 15,
                duration: 500
            }
        )

        updateView({
            selected: feature ? featureModel(feature) : {}
        });

        return false
    });
};
