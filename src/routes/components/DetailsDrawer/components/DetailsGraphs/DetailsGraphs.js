import React from 'react';
import { RadialBarChart, RadialBar, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, Scatter, } from 'recharts';

import { classes, style } from './style';

const data1 = [
  {
    name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8',
  },
  {
    name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed',
  },
  {
    name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1',
  },
  {
    name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d',
  },
  {
    name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c',
  },
  {
    name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57',
  },
  {
    name: 'unknow', uv: 6.67, pv: 4800, fill: '#ffc658',
  },
];

const data2 = [
  {
    name: 'Page A', uv: 590, pv: 800, amt: 1400, cnt: 490,
  },
  {
    name: 'Page B', uv: 868, pv: 967, amt: 1506, cnt: 590,
  },
  {
    name: 'Page C', uv: 1397, pv: 1098, amt: 989, cnt: 350,
  },
  {
    name: 'Page D', uv: 1480, pv: 1200, amt: 1228, cnt: 480,
  },
  {
    name: 'Page E', uv: 1520, pv: 1108, amt: 1100, cnt: 460,
  },
  {
    name: 'Page F', uv: 1400, pv: 680, amt: 1700, cnt: 380,
  },
];

export const DetailsGraphs = () => {
    return (
        <div className={classes.graphsWrapper}>
            <ComposedChart
                width={280}
                height={224}
                data={data2}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 0,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" stroke="#f1eded" />
                <YAxis stroke="#f1eded" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="pv" barSize={15} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                {/* <Scatter dataKey="cnt" fill="red" /> */}
            </ComposedChart>
            <RadialBarChart width={280} height={168} cx={84} cy={84} innerRadius={12} outerRadius={84} barSize={6} data={data1}>
                <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={{top: '14px', left: '192px'}} />
            </RadialBarChart>
        </div>
    );
}
