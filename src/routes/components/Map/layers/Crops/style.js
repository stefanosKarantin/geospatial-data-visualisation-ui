import { Style, Fill, Stroke} from 'ol/style';

import { cropMappings } from './mappings'

export const hoverStyle = (feature, prop = 'ct_decl') => new Style({
    fill: new Fill({
        color: cropMappings[feature.get('ct_decl')].color
    }),
    stroke: new Stroke({
        color: '#001852',
        opacity: '0.5',
        width: 3
    }),
    zIndex: 3
});

export const clickStyle = (feature, prop = 'ct_decl') => new Style({
    fill: new Fill({
        color: cropMappings[feature.get('ct_decl')].color
    }),
    stroke: new Stroke({
        color: '#001852',
        opacity: 1,
        width: 3,
    }),
    opacity: 1,
    zIndex: 3
});

export const cropStyle = (feature, prop = 'ct_decl') => {
    const style = new Style({
        fill: new Fill({
            color: cropMappings[feature.get('ct_decl')].color,
        }),
        stroke: new Stroke({
            color: cropMappings[feature.get('ct_decl')].color,
            opacity: 1,
            width: 1,
        }),
        zIndex: 1
    });

    feature.setStyle(style);
    return style;
};