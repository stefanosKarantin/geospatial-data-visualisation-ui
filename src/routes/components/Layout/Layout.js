import React from 'react';

import { AppBar, Loader } from 'routes/components';

export const Layout = ({children}) =>
    <div style={{height: '100%'}}>
        <AppBar />
        <Loader />
        {children}
    </div>