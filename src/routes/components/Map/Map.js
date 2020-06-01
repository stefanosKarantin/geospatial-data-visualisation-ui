import React from 'react';
import _ from 'lodash';

import { connectProps } from 'store';

import { createMapHook } from './utils';

import {
    MapPopup,
    Filters
} from './components';

const Map = () => {
    createMapHook();
    return (
        <div style={{width: '100%', position: 'relative'}}>
            <div style={{width: '100%', height: '100%'}} id={'map'} />
            {/* <Filters /> */}
            <MapPopup />
        </div>
    );
}

export default connectProps()(Map);