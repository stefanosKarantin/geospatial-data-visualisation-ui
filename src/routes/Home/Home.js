import React from 'react';

import { classes } from './style';

import { Map, Layout } from 'routes/components'

const Home = () =>
    <Layout>
        <div className={classes.mapWrapper}>
            <div className={classes.sideBar}>
            </div>
            <Map type='geojson' />
            {/*<Map type='tile' />*/}
        </div>
    </Layout>;

export default Home;
