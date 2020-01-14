import {
  actionProp,
  stateProp,
} from 'store/utils';

import { push } from 'connected-react-router'

import {
  formValueSelector
} from 'redux-form';

import {
  signIn as signInAction,
  toggleLoadingTrue as toggleLoadingTrueAction,
  toggleLoadingFalse as toggleLoadingFalseAction,
  resetState as resetStateAction,
  googleLogin as googleLoginAction
} from './actions';

/////////////////////////////////
// ROOT COMPONENT-PROPS
////////////////////////////////

const signIn = actionProp((dispatch) => ({
signIn: (payload) => { dispatch(signInAction(payload)) },
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
  changeLocation: payload => { dispatch(push(payload)) }
}));

export {
  changeLocation,
  signIn,
  toggleLoadingTrue,
  toggleLoadingFalse,
  resetState,
  googleLogin
};
