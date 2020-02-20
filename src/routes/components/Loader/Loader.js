import React from 'react';

import { connectProps } from 'store';

import CircularProgress from '@material-ui/core/CircularProgress';

import { isLoaderVisible } from 'modules/component-props';

import { classes } from './style';

const Loader = ({ isLoaderVisible }) =>
<div className={classes.loaderWrapper + ' ' + (isLoaderVisible ? '' : classes.loaderInvisible)}>
    <div>
        <CircularProgress className={classes.loader}/>
    </div>
</div>

export default connectProps(isLoaderVisible)(Loader)