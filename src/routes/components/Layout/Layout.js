import React from 'react';

import { AppBar, NotificationBar, Loader } from 'routes/components';

export const Layout = ({children}) =>
    <div style={{height: '100%'}}>
        <NotificationBar />
        <AppBar />
        <Loader />
        {children}
    </div>