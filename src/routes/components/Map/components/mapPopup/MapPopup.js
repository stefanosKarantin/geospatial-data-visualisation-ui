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
                        style={{color: k === 'rasterVal' ? colors[info[k] - 1] : '#fff'}}
                    >
                        {k === 'area' ? <span>{info[k] + ' m'}<sup>2</sup> </span> : info[k]}

                    </span>
                </div>
            ))}
        </div>
    </div>;

export default MapPopup;