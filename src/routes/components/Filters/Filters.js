import React from 'react';
import _ from 'lodash';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { connectProps } from 'store';

import { filters, updateFilters } from 'modules/component-props';

import { classes } from './style';

const Filters = ({ filters, updateFilters }) => {
  const [state, setState] = React.useState({
    checked: true,
    value: 'all',
    label: 'All'
  });

  const handleChangeFilters = name => event => {
    updateFilters({
        [name]: {
            ...filters[name],
            checked: event.target.checked
        }
    })
    _.every(filters, filter =>  filter.checked === event.target.checked) &&
        setState({
            ...state,
            checked: event.target.checked
        });
  };
  const handleChangeAll = event => {
    const stateFilters = _.forIn(filters, (value, key) => {
        const filter = filters[key]
        return _.set(filter, 'checked', event.target.checked);
    });
    setState({
        ...state,
        checked: event.target.checked
    });
    updateFilters(stateFilters)
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <FormLabel className={classes.checkboxLabel}>Choose clusters</FormLabel>
        <FormGroup>
            <FormControlLabel
                control={<Checkbox
                    checked={state.checked}
                    onChange={handleChangeAll}
                    value={state.value}
                    classes={{
                        root: classes.checkbox
                    }}
                />}
                classes={{
                    label: classes.checkboxLabel
                }}
                label={state.label}
            />
            {_.map(filters, (filter, key) => (
                <FormControlLabel
                    key={key}
                    control={<Checkbox
                        checked={filter.checked}
                        onChange={handleChangeFilters(filter.value)}
                        value={filter.value.toString()}
                        classes={{
                            root: classes.checkbox
                        }}
                    />}
                    classes={{
                        label: classes.checkboxLabel
                    }}
                    label={filter.label}
                />
            ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default connectProps(filters, updateFilters)(Filters)