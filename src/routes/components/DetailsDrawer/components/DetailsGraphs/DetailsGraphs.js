import React from 'react';
import SwipeableViews from 'react-swipeable-views';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { connectProps } from 'store';
import { graphs, regionsView } from 'modules/component-props';

import { classes, style } from './style';

import { SpatialChart, ConfusionChart } from './components';


const TabContainer = ({ children }) => {
    return (
      <Typography component="div" style={{ padding: '16px' }}>
          {console.log(children)}
        {children}
      </Typography>
    );
  }

const DetailsGraphs = ({graphs, regionsView}) => {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <div className={classes.graphsWrapper}>
            <Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Confusion Graphs" />
                    <Tab label="Spatial Graphs" />
                </Tabs>
            </Paper>
            <SwipeableViews
                
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {value === 0 && <TabContainer><ConfusionChart data={graphs.confusion} region={regionsView.selected} /></TabContainer>}
                {value === 1 && <TabContainer><SpatialChart data={graphs.spatial} region={regionsView.selected} /></TabContainer>}
            </SwipeableViews>
        </div>
    );
};

export default connectProps(graphs, regionsView)(DetailsGraphs)