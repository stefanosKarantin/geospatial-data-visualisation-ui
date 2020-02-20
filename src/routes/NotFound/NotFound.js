import React from 'react';

import { classes } from './style';

export const NotFound = () =>
    <div className={classes.notFoundWrapper}>
        <h1 className={classes.title}>404</h1>
        <h4 className={classes.subtitle}>The page you requested could not be found.</h4>
    </div>;
