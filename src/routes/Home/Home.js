import React, { useEffect } from 'react';

import { connectProps } from 'store';

import { classes } from './style';

import { Map, Layout, Filters } from 'routes/components'

import { getGeoData, toggleLoadingTrue } from 'modules/component-props';

const Home = ({ getGeoData, toggleLoadingTrue }) => {
    useEffect(() => {
        toggleLoadingTrue();
        getGeoData();
    }, []);
    return (
        <Layout>
            <div className={classes.mapWrapper}>
                <Map />
            <div className={classes.filters}>
                <Filters />
            </div>
            </div>
            <div className={classes.timeline}>TIMELINE</div>
        </Layout>
    )
};

export default connectProps(getGeoData, toggleLoadingTrue)(Home);
