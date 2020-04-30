import React from 'react';
import _ from 'lodash';
import { Vector as LayerVector} from 'ol/layer';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { connectProps } from 'store';

import { regions, regionsView } from 'modules/component-props';

import { classes } from './style';

const RegionSelection = ({regions, regionsView}) => {
    const handleChange = e => {
        const map = document.getElementById('map').data;
        const region = e.target.value;
        map.getLayers().getArray().map(l => {
            if (l instanceof LayerVector) {
                const features = l.getSource().getFeatures()
                const f = _.find(features, f => f.get('name') === region)
                const length = map.getInteractions().getArray().length
                const deselected =  map.getInteractions().getArray()[length - 1].getFeatures().getArray()[0]
                map.getInteractions().getArray()[length - 1].getFeatures().pop()
                map.getInteractions().getArray()[length - 1].getFeatures().push(f)
                map.getInteractions().getArray()[length - 1].dispatchEvent({
                    type: 'select',
                    selected: [f],
                    deselected: [deselected]
                  });
            }
        });
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
export default connectProps(regions, regionsView)(RegionSelection)