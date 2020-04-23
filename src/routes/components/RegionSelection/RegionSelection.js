import React from 'react';
import _ from 'lodash';
import { Vector as LayerVector} from 'ol/layer';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { connectProps } from 'store';

import { regions, selectedFeature, updateView } from 'modules/component-props';
import { regionStyle, clickStyle } from 'routes/components/Map/layers/Regions/style';

import { classes } from './style';

const RegionSelection = ({regions, selectedFeature, updateView}) => {
    const handleChange = e => {
        const map = document.getElementById('map').data;
        const region = e.target.value;
        console.log(e)
        map.getLayers().getArray().map(l => {
            if (l instanceof LayerVector) {
                const features = l.getSource().getFeatures()
                const f = _.find(features, f => f.get('name') === region)
                // clickSelected = f;

                const extent = f.getGeometry().getExtent();

                map.getView().fit(extent, {maxZoom: 15, duration: 500})

                f.setStyle(clickStyle(f));
                return true;
            }
        });

        const r = _.find(regions, r => r[0] === region)
        updateView({
            selectedFeature: {
                id: r[1],
                name: r[0],
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
                        value={selectedFeature ? selectedFeature.name : ''}
                        onChange={handleChange}
                        label="Περιφέρεια"
                        className={classes.selection}
                    >
                        {regions.map((r, index) => (
                            <MenuItem key={index} value={r[0]}>{r[0]}</MenuItem>
                        ))}
                    </Select>
                </div>
            }
        </FormControl>
      )
}
export default connectProps(regions, selectedFeature, updateView)(RegionSelection)