import React from 'react';


import { classes } from './style';

const colors = ["#E9967A", "#DAA520", "#800080", "#00008B", "#FF0000", "#BC8F8F", "#55BADA", "#FFE4C4", "#F4A460"];

export const Detail = ({detailKey, value, style = {}}) =>
    <div style={style} className={classes.detailWrapper}>
        <span>{detailKey + ':'}</span>
        <span
            style={detailKey === 'rasterVal' ? {color: colors[value - 1]} : {}}
        >
            {detailKey === 'area' ? <span>{value + ' m'}<sup>2</sup> </span> : value}
        </span>
    </div>;