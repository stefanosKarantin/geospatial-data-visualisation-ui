import React from 'react';

import { colors } from 'routes/components/Map/components/utils';

import { classes } from './style';

export const Detail = ({detailKey, value, style = {}}) =>
    <div style={style} className={classes.detailWrapper}>
        <span>{detailKey + ':'}</span>
        <span
            style={detailKey === 'rasterVal' ? {color: colors[value - 1]} : {}}
        >
            {detailKey === 'area' ? <span>{value + ' m'}<sup>2</sup> </span> : value}
        </span>
    </div>;