import React from 'react';
import _ from 'lodash';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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

export default Filters;