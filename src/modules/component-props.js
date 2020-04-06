import {
  actionProp,
  stateProp,
} from 'store/utils';

import { push } from 'connected-react-router'

// import {
//   formValueSelector
// } from 'redux-form';

import {
  signIn as signInAction,
  logout as logoutAction,
  toggleLoadingTrue as toggleLoadingTrueAction,
  toggleLoadingFalse as toggleLoadingFalseAction,
  resetState as resetStateAction,
  googleLogin as googleLoginAction,
  register as registerAction,
  updateNotification as updateNotificationAction,
  getGeoData as getGeoDataAction,
  getRegions as getRegionsAction,
  updateFilters as updateFiltersAction,
  updateView as updateViewAction
} from './actions';

/////////////////////////////////
// ROOT COMPONENT-PROPS
////////////////////////////////

const signIn = actionProp((dispatch) => ({
    signIn: (payload) => { dispatch(signInAction(payload)) },
}));

const logout = actionProp((dispatch) => ({
    logout: (payload) => { dispatch(logoutAction(payload)) },
}));

const register = actionProp((dispatch) => ({
    register: (payload) => { dispatch(registerAction(payload)) },
}));

const toggleLoadingTrue = actionProp((dispatch) => ({
    toggleLoadingTrue: (payload) => { dispatch(toggleLoadingTrueAction(payload)) },
}));

const toggleLoadingFalse = actionProp((dispatch) => ({
    toggleLoadingFalse: (payload) => { dispatch(toggleLoadingFalseAction(payload)) },
}));

const resetState = actionProp(dispatch => ({
    resetState: () => { dispatch(resetStateAction()) },
}));

const changeLocation = actionProp((dispatch) =>({
    changeLocation: payload => { dispatch(push(payload)) }
}));

const googleLogin = actionProp((dispatch) =>({
    googleLogin: payload => { dispatch(googleLoginAction(payload)) }
}));

const updateNotification = actionProp((dispatch) =>({
    updateNotification: payload => { dispatch(updateNotificationAction(payload)) }
}));

const getGeoData = actionProp((dispatch) =>({
    getGeoData: payload => { dispatch(getGeoDataAction(payload)) }
}));

const getRegions = actionProp((dispatch) =>({
    getRegions: payload => { dispatch(getRegionsAction(payload)) }
}));

const updateFilters = actionProp((dispatch) =>({
    updateFilters: payload => { dispatch(updateFiltersAction(payload)) }
}));

const updateView = actionProp((dispatch) =>({
    updateView: payload => { dispatch(updateViewAction(payload)) }
}));

const notification = stateProp(({ app: { notification } }) => ({
    notification
}));

const isLoaderVisible = stateProp(({ app: { isLoaderVisible } }) => ({
    isLoaderVisible
}));

const geodata = stateProp(({ app: { geodata } }) => ({
    geodata
}));

const regions = stateProp(({ app: { regions } }) => ({
    regions
}));

const filters = stateProp(({ app: { filters } }) => ({
    filters
}));

const selectedFeature = stateProp(({ app: { view: { selectedFeature } } }) => ({
    selectedFeature
}));

const hoveredFeature = stateProp(({ app: { view: { hoveredFeature } } }) => ({
    hoveredFeature
}));

const selectedRegion = stateProp(({ app: { view: { selectedRegion } } }) => ({
    selectedRegion
}));

export {
  changeLocation,
  signIn,
  logout,
  register,
  toggleLoadingTrue,
  toggleLoadingFalse,
  resetState,
  googleLogin,
  updateNotification,
  getGeoData,
  getRegions,
  updateFilters,
  updateView,
  notification,
  isLoaderVisible,
  geodata,
  filters,
  selectedFeature,
  hoveredFeature,
  regions,
  selectedRegion
};
