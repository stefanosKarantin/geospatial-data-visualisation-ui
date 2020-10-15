import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import SwipeableViews from 'react-swipeable-views';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { cropMappings } from '../../../../../Map/layers/Crops/mappings';

// import { classes, style } from './style';
const modifyData = data =>
    data.map((d, index) => ({
        crop: cropMappings[index < 17 ? index + 1 : index +2].name,
        length: d[0],
        area: d[1],
        cropType: [index < 17 ? index + 1 : index +2]
    }));

const Chart = ({data, type}) => 
  <ResponsiveContainer width='52%' height={430} >
    {/* <div style={{fontSize:'14px'}}>{title}</div> */}
    <ComposedChart data={data}
      margin={{top: 5, right: 20, left: 20, bottom: 80}}>
      <XAxis dataKey="crop" padding={{ left: 20, right: 20 }} tick={{textAnchor: 'end', fill: 'white', angle: -35, x: 0, y:0, dy:0}} interval={0}/>
      <YAxis tick={{fill: 'white'}} />
      <Tooltip formatter={(value) => (<span>{new Intl.NumberFormat('en').format(value)}m{type === 'area' ? <sup>2</sup> : ''}</span>)} />
      <CartesianGrid strokeDasharray="3 3"/>
      <Bar dataKey={type} barSize={20} fill='#413ea0' label={{ position: 'top' }}>
        {
          data.map((c, index) => (
            <Cell key={`cell-${index}`} fill={cropMappings[c.cropType].color}/>
          ))
        }
      </Bar>
      {/* <Line type='monotone' dataKey={type} stroke='#ff7300'/> */}
    </ComposedChart>
  </ResponsiveContainer>;

const GraphTab = ({data, totalData, type, region}) =>
  <div>
    <div style={{height: '20px', display: 'flex'}}>
      <h2 style={{
          width: '50%',
          color: 'white',
          margin: 'auto',
          textAlign: 'center'
      }}>{region}</h2>
      <h2 style={{
          width: '50%',
          color: 'white',
          margin: 'auto',
          textAlign: 'center'
      }}>{'Σύνολο'}</h2>
    </div>
    <div style={{display: 'flex'}}>
      <Chart data={data} type={type} />
      <Chart data={totalData} type={type} title='Σύνολο' />
    </div>
  </div>;

const TabContainer = ({ children }) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
export const SpatialChart = ({data, region}) => {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
      setValue(index);
  };
  const modifiedData = modifyData(data[region.id]);
  const modifiedTotalData = modifyData(data['total']);

  return (
    <div>
      <Paper>
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Perimeter" />
            <Tab label="Area" />
        </Tabs>
      </Paper>
      <SwipeableViews
        index={value}
        onChangeIndex={handleChangeIndex}
      >
          {value === 0 &&
            <TabContainer>
              <GraphTab data={modifiedData} totalData={modifiedTotalData} type={'length'} region={region.name} />
            </TabContainer>
          }
          {value === 1 &&
            <TabContainer>
              <GraphTab data={modifiedData} totalData={modifiedTotalData} type={'area'} region={region.name} />
            </TabContainer>
          }
      </SwipeableViews>
    </div>
  )
}