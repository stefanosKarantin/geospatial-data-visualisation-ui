import React from 'react';
import _ from 'lodash';

import { VectorTile as VectorTileLayer} from 'ol/layer';
import { Style, Fill, Stroke} from 'ol/style';

import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import { connectProps } from 'store';
import { componentDidMount, componentDidUpdate } from 'hooks';
import { filters } from 'modules/component-props';
import {
    FieldType
} from './components';

import { classes } from './style';

const contentFilters = {
    fieldType: {
        component: <FieldType />,
        label: 'Field Type',
    }
};

const colors = ["#E9967A", "#DAA520", "#800080", "#00008B", "#FF0000", "#BC8F8F", "#55BADA", "#FFE4C4", "#F4A460"]

const filterStyle = (feature, checked, prop = 'raster_val') => {
    const emptyStyle = new Style({});
    const style = new Style({
        fill: new Fill({
            color: colors[feature.get(prop) - 1],
        }),
        stroke: new Stroke({
            color: colors[feature.get(prop) - 1],
            opacity: 1,
            width: 1,
        }),
        zIndex: 1
    });
    const checkedStye = checked.includes(feature.get(prop)) ? style : emptyStyle;
    feature.setStyle(checkedStye);
    return checkedStye;
};

const getPopover = (id, open, anchorEl, handleClose, component) =>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{
            paper: classes.popoverPaper
        }}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: -10,
            horizontal: 'left',
        }}
    >
        {component}
    </Popover>;

const Filters = ({ filters }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  componentDidUpdate(() => {
    const checked = _.filter(filters, f => f.checked).map(f => f.value)
    const map = document.getElementById('map').data
    map && map.getLayers().getArray().map(l => {
        if (l instanceof VectorTileLayer) {
            l.getSource().refresh()
            l.setStyle((f) => {filterStyle(f,checked)})
        }
    })
  }, [filters])  
  const open = Boolean(anchorEl);

  return (
    <div className={classes.filtersWrapper}>
        {Object.keys(contentFilters).map((f, index) => (
            <div className={classes.filter} key={index}>
                <Button
                    aria-describedby={open ? f : undefined}
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    {contentFilters[f].label}
                </Button>
                {getPopover(
                    open ? f : undefined,
                    open,
                    anchorEl,
                    handleClose,
                    contentFilters[f].component
                )}
            </div>
        ))}
    </div>
  );
}

export default connectProps(filters)(Filters);