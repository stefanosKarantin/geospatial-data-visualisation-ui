import { cropMappings } from '../../layers/Crops/mappings';

export const fieldMappings = {
    id: { key: 'Id' },
    name: { key: 'Name' },
    ct_conf: { key: 'Confidence score' },
    ct_decl: { key: 'Actual', value: cropMappings },
    ct_pred: { key: 'Predicted', value: cropMappings },
    s1pix: { key: 'Sentinel-1 pixels' },
    s2pix: { key: 'Sentinel-2 pixels' },
    area: {
        key: 'Area',
        unit: 'm<sup>2</sup>'
    },
    perimeter: {
        key: 'Perimeter',
        unit: 'm'
    },
};