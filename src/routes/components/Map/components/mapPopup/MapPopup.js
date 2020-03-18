import React from 'react';
import _ from 'lodash';

import { colors } from 'routes/components/Map/components/utils';

import { classes, styles } from './style';

const MapPopup = ({info}) =>
    <div className={classes.popupWrapper}>
        <div className={classes.detailsWrapper}>
            {Object.keys(info).map((k, index) => (
                <div key={index} className={classes.detail}>
                    <span
                        className={classes.detailKey}
                    >
                        {k + ': '}
                    </span>
                    <span
                        className={classes.detailValue}
                        style={{color: k === 'rasterVal' ? colors[info[k]] : '#fff'}}
                    >
                        {k === 'area' ? <span>{Math.round(info[k] * 100)/100 + ' m'}<sup>2</sup> </span> : info[k]}

                    </span>
                </div>
            ))}
        </div>
    </div>;

export default MapPopup;