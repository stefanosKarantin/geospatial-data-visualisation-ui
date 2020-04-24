import { handleActions } from 'redux-actions';

import {
    updateNotification,
    toggleLoadingTrue,
    toggleLoadingFalse,
    updateGeoData,
    updateRegions,
    updateFilters,
    updateView
} from './actions';

let initialState = {
    notification: {
        open: false
    },
    isLoaderVisible: false,
    geodata: {},
    regions: {},
    filters: {},
    view: {
        selectedFeature: {}
    }
};

const reducer = handleActions({
    [updateNotification.type]: (state, {payload}) => ({
        ...state,
        notification: {
          ...payload
        }
    }),
    [toggleLoadingTrue.type]: state => ({
        ...state,
        isLoaderVisible: true
    }),
    [toggleLoadingFalse.type]: state => ({
        ...state,
        isLoaderVisible: false
    }),
    [updateGeoData.type]: (state, { payload }) => ({
        ...state,
        geodata: payload
    }),
    [updateRegions.type]: (state, { payload }) => ({
        ...state,
        regions: payload
    }),
    [updateFilters.type]: (state, { payload }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...payload
        }
    }),
    [updateView.type]: (state, { payload }) => ({
        ...state,
        view: {
            ...state.view,
            ...payload
        }
    })
  },
  {
    ...initialState,
  },
);

export default reducer;
