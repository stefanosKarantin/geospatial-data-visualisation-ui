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

        const features = selectSingleClick.getFeatures().getArray();
        const selected = e.selected[0]
        const deselected = e.deselected

        deselected.length > 0 && deselected.forEach(d => d && d.setStyle(regionStyle(d)))
        selected &&
        selected.setStyle(clickStyle(selected))
        selected &&
        map.getView().fit(
            selected.getGeometry().getExtent(),
            {
                maxZoom: 15,
                duration: 500
            }
        )

        updateView({
            selected: selected ? featureModel(selected) : {}
        });
        const extraFeature = features.length > 1 && features[features.length - 1];
        console.log(extraFeature)
        extraFeature && extraFeature.setStyle(regionStyle(extraFeature))
        return false
    });
};
