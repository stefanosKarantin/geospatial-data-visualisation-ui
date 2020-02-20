
import { createAction as createReduxAction } from 'redux-actions';

const createAction = (nameSpace) => (actionID) => {
  const ACTION_CONST = `${nameSpace}/${actionID}`;
  const actionCreator = createReduxAction(ACTION_CONST);
  actionCreator.type = ACTION_CONST;
  return actionCreator;
}

//////////////////////////////////////
// Root Actions
/////////////////////////////////////

const rootAction = createAction('@@ROOT');

const signIn = rootAction('SIGN_IN');

const logout = rootAction('LOG_OUT');

const toggleLoadingTrue = rootAction('TOGGLE_LOADING_TRUE');

const toggleLoadingFalse = rootAction('TOGGLE_LOADING_FALSE');

const getNewAccessToken = rootAction('GET_NEW_ACCESS_TOKEN');

const resetState = rootAction('RESET_STATE');

const redirectionError = rootAction('REDIRECTION_ERROR');

const googleLogin = rootAction('GOOGLE_LOGIN');

const register = rootAction('REGISTER');

const refreshTokenSuccess = rootAction('REFRESH_TOKEN_SUCCESS');

const updateStateUser = rootAction('UPDATE_STATE_USER');

const updateNotification = rootAction('UPDATE_NOTIFICATION');

const getGeoData = rootAction('GET_GEO_DATA');

const updateGeoData = rootAction('UPDATE_GEO_DATA');
/////////////////////////////////////


export {
    signIn,
    logout,
    toggleLoadingTrue,
    toggleLoadingFalse,
    resetState,
    googleLogin,
    getNewAccessToken,
    redirectionError,
    refreshTokenSuccess,
    updateStateUser,
    updateNotification,
    getGeoData,
    updateGeoData,
    register
};
