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
  updateFieldsView as updateFieldsViewAction,
  updateRegionsView as updateRegionsViewAction
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

const updateFieldsView = actionProp((dispatch) =>({
    updateFieldsView: payload => { dispatch(updateFieldsViewAction(payload)) }
}));

const updateRegionsView = actionProp((dispatch) =>({
    updateRegionsView: payload => { dispatch(updateRegionsViewAction(payload)) }
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

const regionsView = stateProp(({ app: { view: { regionsView } } }) => ({
    regionsView
}));

const fieldsView = stateProp(({ app: { view: { fieldsView } } }) => ({
    fieldsView
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
    updateFieldsView,
    updateRegionsView,
    notification,
    isLoaderVisible,
    geodata,
    filters,
    regions,
    regionsView,
    fieldsView
};
