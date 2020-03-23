import { Style, Fill, Stroke}from 'ol/style';

export const colors = ["#E9967A", "#DAA520", "#800080", "#00008B", "#FF0000", "#BC8F8F", "#55BADA", "#FFE4C4", "#F4A460"]

export const hoverStyle = fill => new Style({
    fill,
    stroke: new Stroke({
        color: '#001852',
        opacity: '0.5',
        width: 3
    }),
    zIndex: 1
});

export const clickStyle = fill => new Style({
    fill,
    stroke: new Stroke({
        color: '#001852',
        opacity: 1,
        width: 3,
        zIndex: 1
    }),
    zIndex: 1,
    opacity: 1
});

export const rasterValStyle = feature => {
    const style = new Style({
        fill: new Fill({
            color: colors[feature.get("rasterVal") - 1]
        }),
        stroke: new Stroke({
            color: colors[feature.get("rasterVal") - 1],
            opacity: 1,
            width: 1
        })
    });

    feature.setStyle(style);
};
