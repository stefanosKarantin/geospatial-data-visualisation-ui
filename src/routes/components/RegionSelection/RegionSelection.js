import React from 'react';
import _ from 'lodash';
import { Vector as LayerVector} from 'ol/layer';
import MapEvent from 'ol/MapEvent';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { connectProps } from 'store';

import { regions, regionsView, updateRegionsView } from 'modules/component-props';
import { regionStyle, clickStyle } from 'routes/components/Map/layers/Regions/style';

import { classes } from './style';

const selectEvent = f => new MapEvent({target: f, type: 'singleclick'})
const RegionSelection = ({regions, regionsView, updateRegionsView}) => {
    const handleChange = e => {
        const map = document.getElementById('map').data;
        const region = e.target.value;
        map.getLayers().getArray().map(l => {
            if (l instanceof LayerVector) {
                const features = l.getSource().getFeatures()
                const f = _.find(features, f => f.get('name') === region)
                map.dispatchEvent(selectEvent(f))

        //         const extent = f.getGeometry().getExtent();

        //         map.getView().fit(extent, {maxZoom: 15, duration: 500})
        //         const selectedOld = regionsView.selected && _.find(features, f => f.get('name') === regionsView.selected.name)
        //         selectedOld && selectedOld.setStyle(regionStyle(selectedOld)) && selectedOld.set('state', 'deselected');
        //         f.setStyle(clickStyle(f));

        //         f.set('state', 'selected');
        //         return true;
            }
        });

        const r = _.find(regions, r => r[0] === region)
        r && updateRegionsView({
            selected: {
                id: r[0],
                name: r[1],
                area: Math.round(r[3] * 100)/100
            }
        })
    }
    return (
        <FormControl variant="outlined" className={classes.regionSelection}>
            {regions && !_.isEmpty(regions) &&
                <div>
                    <InputLabel classes={{root: classes.inputLabel}}>{'Περιφέρεια'}</InputLabel>
                    <Select
                        value={regionsView.selected ? regionsView.selected.name || '' : ''}
                        onChange={handleChange}
                        label="Περιφέρεια"
                        className={classes.selection}
                    >
                        {regions.map((r, index) => (
                            <MenuItem key={index} value={r[1]}>{r[1]}</MenuItem>
                        ))}
                    </Select>
                </div>
            }
        </FormControl>
      )
}
export default connectProps(regions, regionsView, updateRegionsView)(RegionSelection)