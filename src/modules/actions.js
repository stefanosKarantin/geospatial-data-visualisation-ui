
import { createAction } from 'store';

//////////////////////////////////////
// Root Actions
/////////////////////////////////////

const rootAction = createAction('@@ROOT');

const signIn = rootAction('SIGN_IN');

const toggleLoadingTrue = rootAction('TOGGLE_LOADING_TRUE');

const toggleLoadingFalse = rootAction('TOGGLE_LOADING_FALSE');

const resetState = rootAction('RESET_STATE');

/////////////////////////////////////


export {
    signIn,
    toggleLoadingTrue,
    toggleLoadingFalse,
    resetState
};
