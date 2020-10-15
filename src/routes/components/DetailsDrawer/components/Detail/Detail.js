import React from 'react';


import { classes } from './style';

const colors = ["#E9967A", "#DAA520", "#800080", "#00008B", "#FF0000", "#BC8F8F", "#55BADA", "#FFE4C4", "#F4A460"];

const getKm2 = m => m > 1000000 ? (m/1000000).toFixed(1) + ' km' : m + ' m';

export const Detail = ({detailKey, value, style = {}}) =>
    <div style={{...style, justifyContent: detailKey === 'name' ? 'left' : 'space-between'}} className={classes.detailWrapper}>
        <span>{detailKey === 'name' ? '' : detailKey + ': '}</span>
        <span>   
            {detailKey === 'area' ? <span>{getKm2(value)}<sup>2</sup> </span> : value}
        </span>
    </div>;