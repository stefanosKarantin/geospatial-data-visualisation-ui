import React from 'react';

import { classes } from './style';

import {
    Map,
    Layout,
    SideBar,
    Regions,
    GeoJsonLayer,
    TileLayer,
    Crops
} from 'routes/components'

const FeatureLayer = ({featureType}) => {
    switch(featureType) {
        case 'tile':
            return <TileLayer />;
        case 'crops':
            return <Crops />;
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
            <FeatureLayer featureType={'crops'} />
        </div>
    </Layout>;

export default Home;
