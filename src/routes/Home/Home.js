import React from 'react';

import {
  // Route,
  // withRouter
} from 'react-router-dom';

import { classes } from './style';

import { Map, Layout } from '../components'
const Home = () => (
    <Layout>
        <div className={classes.mapWrapper}>
            <Map />
        <div className={classes.filters}>
            <span>FILTERS</span>
        </div>
        </div>
        <div className={classes.timeline}>TIMELINE</div>
    </Layout>
);

export default Home;
