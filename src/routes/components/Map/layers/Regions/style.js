import { Style, Fill, Stroke}from 'ol/style';

export const hoverStyle = (feature, prop = 'raster_val') => new Style({
    fill: new Fill({
        color: 'transparent'
    }),
    stroke: new Stroke({
        color: '#4560cc',
        opacity: '0.5',
        width: 3
    }),
    zIndex: 9999
});

export const clickStyle = (feature, prop = 'raster_val') => new Style({
    fill: new Fill({
        color: 'transparent'
    }),
    stroke: new Stroke({
        color: '#2843ad',
        opacity: 1,
        width: 3,
    }),
    zIndex: 9999
});

export const regionStyle = (feature, prop = 'raster_val') => {
    const style = new Style({
        fill: new Fill({
            color: 'transparent'
        }),
        stroke: new Stroke({
            color: '#5d79e8',
            opacity: 1,
            width: 1,
        }),
        zIndex: 1
    });

    feature.setStyle(style);
    return style;
};
