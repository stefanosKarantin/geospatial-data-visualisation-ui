import React from 'react';

import { classes } from './style';

import { Map, Layout, SideBar } from 'routes/components'

const Home = () =>
    <Layout>
        <div className={classes.mapWrapper}>
            <SideBar />
            <Map featureType='tile' />
            {/*<Map type='tile' />*/}
        </div>
    </Layout>;

export default Home;
