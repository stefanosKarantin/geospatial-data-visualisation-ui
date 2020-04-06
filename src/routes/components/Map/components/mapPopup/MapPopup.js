import React from 'react';
import _ from 'lodash';

import { connectProps } from 'store';
import { hoveredFeature } from 'modules/component-props';

import { classes } from './style';

const colors = ["#E9967A", "#DAA520", "#800080", "#00008B", "#FF0000", "#BC8F8F", "#55BADA", "#FFE4C4", "#F4A460"];

const MapPopup = ({ hoveredFeature }) =>
    !_.isEmpty(hoveredFeature)
        ? <div className={classes.popupWrapper}>
            <div className={classes.detailsWrapper}>
                {Object.keys(hoveredFeature).map((k, index) => (
                    <div key={index} className={classes.detail}>
                        <span
                            className={classes.detailKey}
                        >
                            {k + ': '}
                        </span>
                        <span
                            className={classes.detailValue}
                            style={{color: k === 'rasterVal' ? colors[hoveredFeature[k] - 1] : '#fff'}}
                        >
                            {k === 'area' ? <span>{hoveredFeature[k] + ' m'}<sup>2</sup> </span> : hoveredFeature[k]}

                        </span>
                    </div>
                ))}
            </div>
        </div>
        : <div />;

export default connectProps(hoveredFeature)(MapPopup);