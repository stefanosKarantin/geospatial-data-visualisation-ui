import React, { useEffect } from 'react'
import _ from 'lodash';

import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as LayerVector} from 'ol/layer';
import { OSM, TileWMS, Vector as SourceVector} from 'ol/source';

import { connectProps } from 'store';

const MapBox = () => {

  useEffect(() => {
    // const featuresLayer = new LayerVector({
    //   source: new SourceVector({
    //     features:[],
    //   })
    // });
    const map = new Map({
      target: 'map',
      layers: [
		    new TileLayer({
		      source: new OSM()
        }),
        new TileLayer({
          // extend: [-13884991, 2870341, -7455066, 6338219],
          source: new TileWMS({
            url: 'https://ahocevar.com/geoserver/wms',
            params: { 'LAYERS': 'topp:states', 'TILED': true},
            serverType: 'geoserver',
            transition: 400
          })
        })
        // featuresLayer
      ],
      view: new View({
        center: [-10997148, 4569099], 
        zoom: 4,
      })
    });
  }, []);
  return (
    <div style={{width: '100%'}} id={'map'} />
  );
}

export default connectProps()(MapBox);
