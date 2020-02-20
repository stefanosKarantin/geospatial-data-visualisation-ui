import { handleActions } from 'redux-actions';

import {
    updateNotification,
    toggleLoadingTrue,
    toggleLoadingFalse,
    updateGeoData
} from './actions';

let initialState = {
    notification: {
        open: false
    },
    isLoaderVisible: false,
    geodata: {}
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
  },
  {
    ...initialState,
  },
);

export default reducer;
