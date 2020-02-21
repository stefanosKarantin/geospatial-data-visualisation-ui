import { handleActions } from 'redux-actions';

import {
    updateNotification,
    toggleLoadingTrue,
    toggleLoadingFalse,
    updateGeoData,
    updateFilters
} from './actions';

let initialState = {
    notification: {
        open: false
    },
    isLoaderVisible: false,
    geodata: {},
    filters: {}
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
    [updateFilters.type]: (state, { payload }) => ({
        ...state,
        filters: {
            ...state.filters,
            ...payload
        }
    })
  },
  {
    ...initialState,
  },
);

export default reducer;
