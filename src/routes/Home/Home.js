import React, { useEffect } from 'react';

import { classes } from './style';

import { Map, Layout, Filters } from 'routes/components'

const Home = () =>
    <Layout>
        <div className={classes.mapWrapper}>
            <Map type='geojson' />
        <div className={classes.filters}>
            <Filters />
        </div>
        </div>
        <div className={classes.timeline}>TIMELINE</div>
    </Layout>;

export default Home;
