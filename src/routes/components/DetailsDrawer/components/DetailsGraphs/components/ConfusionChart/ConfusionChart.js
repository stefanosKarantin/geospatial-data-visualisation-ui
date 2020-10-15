import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

import { cropMappings } from '../../../../../Map/layers/Crops/mappings';

// import { classes, style } from './style';

const modifyData = data =>
    data.map((d, index) => ({
        crop: cropMappings[index < 17 ? index + 1 : index +2].name,
        actual: d[0],
        true: d[1],
        false: d[2],
    }));

const Chart = ({data}) =>
    <ResponsiveContainer width='52%' height={520}>
        <BarChart label='elaaa' data={data} margin={{top: 5, right: 20, left: 20, bottom: 80}} >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis
                dataKey="crop"
                padding={{ left: 20, right: 20 }}
                margin={{bottom: 20}}
                tick={{textAnchor: 'end', fill: 'white', angle: -35, x: 0, y:0, dy:0}}
                interval={0}
            />
            <YAxis tick={{fill: 'white'}}/>
            <Tooltip />
            <Legend verticalAlign="top" margin={{bottom: -10}} formatter={(value, entry) => <span style={{ color: 'white' }}>{value}</span>}/>
            <Bar dataKey="actual" barSize={20} fill="#8884d8" />
            <Bar dataKey="true" barSize={20} fill="#82ca9d" />
            <Bar dataKey="false" barSize={20} fill="#85679d" />
        </BarChart>
    </ResponsiveContainer>;
export const ConfusionChart = ({data, region}) =>
<div>
    <div style={{height: '20px', display: 'flex'}}>
        <h2 style={{
            width: '50%',
            color: 'white',
            margin: 'auto',
            textAlign: 'center',
        }}>{region.name}</h2>
        <h2 style={{
            width: '50%',
            color: 'white',
            margin: 'auto',
            textAlign: 'center'
        }}>{'Σύνολο'}</h2>
    </div>
    <div style={{display: 'flex'}}>
        <Chart data={modifyData(data[region.id])} />
        <Chart data={modifyData(data['total'])} />
    </div>
</div>;
    // <BarChart width={900} height={530} data={modifyData(data[region.id])}
    //     margin={{top: 5, right: 30, left: 20, bottom: 80}} >
    //     <CartesianGrid strokeDasharray="3 3"/>
    //     <XAxis dataKey="crop" padding={{ left: 50, right: 50 }} margin={{bottom: 20}} tick={{textAnchor: 'end', fill: 'white', angle: -35, x: 0, y:0, dy:0}}
    //         interval={0} />
    //     <YAxis tick={{fill: 'white'}}/>
    //     <Tooltip />
    //     <Legend verticalAlign="top" margin={{bottom: -10}} formatter={(value, entry) => <span style={{ color: 'white' }}>{value}</span>}/>
    //     <Bar dataKey="actual" barSize={20} fill="#8884d8" />
    //     <Bar dataKey="true" barSize={20} fill="#82ca9d" />
    //     <Bar dataKey="false" barSize={20} fill="#85679d" />
    // </BarChart>;

