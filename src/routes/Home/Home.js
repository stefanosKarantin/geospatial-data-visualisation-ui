import React from 'react';

import { classes } from './style';

import {
    Map,
    Layout,
    SideBar,
    Regions,
    GeoJsonLayer,
    TileLayer
} from 'routes/components'

const FeatureLayer = ({featureType}) => {
    switch(featureType) {
        case 'tile':
            return <TileLayer />;
        case 'geojson':
        default:
            return <GeoJsonLayer />;
    };
};

const Home = () =>
    <Layout>
        <div className={classes.mapWrapper}>
            <SideBar />
            <Map />
            <Regions />
            <FeatureLayer featureType={'tile'} />
        </div>
    </Layout>;

export default Home;
