import { handleActions } from 'redux-actions';

import {
    updateNotification,
    toggleLoadingTrue,
    toggleLoadingFalse,
    updateGeoData,
    updateRegions,
    updateFilters,
    updateFieldsView,
    updateRegionsView,
    toggleGraphs,
    updateGraphs
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
        regionsView: {},
        fieldsView: {},
        graphsView: false
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
    [updateFieldsView.type]: (state, { payload }) => ({
        ...state,
        view: {
            ...state.view,
            fieldsView: {
                ...state.view.fieldsView,
                ...payload
            }
        }
    }),
    [updateRegionsView.type]: (state, { payload }) => ({
        ...state,
        view: {
            ...state.view,
            regionsView: {
                ...state.view.regionsView,
                ...payload
            }
        }
    }),
    [toggleGraphs.type]: (state) => ({
        ...state,
        view: {
            ...state.view,
            graphsView: !state.view.graphsView
        }
    }),
    [updateGraphs.type]: (state, { payload }) => ({
        ...state,
        graphs: { ...payload }
    }),
  },
  {
    ...initialState,
  },
);

export default reducer;
