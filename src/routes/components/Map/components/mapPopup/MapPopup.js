import React from 'react';
import _ from 'lodash';

import { connectProps } from 'store';
import { regionsView, fieldsView } from 'modules/component-props';

import { classes } from './style';
import { fieldMappings, cropMappings } from './mappings';

const PopUp = ({ hoveredFeature }) =>
    <div className={classes.popupWrapper}>
        <div className={classes.detailsWrapper}>
            {Object.keys(hoveredFeature).map((k, index) => (
                <div key={index} className={classes.detail}>
                    <span
                        className={classes.detailKey}
                    >
                        {fieldMappings[k].key + ': '}
                    </span>
                    <span
                        className={classes.detailValue}
                        style={{color: fieldMappings[k].value ? fieldMappings[k].value[hoveredFeature[k]].color : '#fff'}}
                    >
                        {fieldMappings[k].value ? fieldMappings[k].value[hoveredFeature[k]].name : hoveredFeature[k]}
                        {fieldMappings[k].unit ? <span dangerouslySetInnerHTML={{__html: fieldMappings[k].unit}} /> : '' }

                    </span>
                </div>
            ))}
        </div>
    </div>;

const MapPopup = ({ regionsView, fieldsView }) => {
    const hoveredFeature = fieldsView.hovered || regionsView.hovered;
    return (
        hoveredFeature
            ? <PopUp hoveredFeature={hoveredFeature} />
            : <div />
    )
};

export default connectProps(regionsView, fieldsView)(MapPopup);