import React from 'react';
import _ from 'lodash';

import { classes, styles } from './style';

const MapPopup = ({info}) =>
    <div className={classes.popupWrapper}>
        <div className={classes.detailsWrapper}>
            {_.map(info, (v, k) => (
                <div key={k} className={classes.detail}>
                    <span className={classes.detailKey}>{k + ':'}</span>
                    <span className={classes.detailValue}>{' ' + v}</span>
                </div>
            ))}
        </div>
    </div>;

export default MapPopup;