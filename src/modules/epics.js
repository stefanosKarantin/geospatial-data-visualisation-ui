import { combineEpics } from 'redux-observable';
import {
  // interval as observableInterval,
  // Observable,
  of as observableOf,
  from as observableFrom,
  defer as observableDefer
} from 'rxjs';

import {
  mergeMap,
  // map,
  switchMap,
  catchError,
  // takeUntil,
  // take,
  // merge,
  // concat,
  flatMap
} from 'rxjs/operators';

import { serverError } from 'store/operators';

import _ from 'lodash';

import { push } from 'connected-react-router';

// import axios from 'axios';

import {
  reset,
  stopSubmit,
  setSubmitFailed,
  resetSection,
  // change
} from 'redux-form';

import {
  updateToken,
  updateRefreshToken,
  getRefreshToken,
  getUser,
  updateUser,

  signInService,
  refreshTokenService,
} from 'model-services';

import {

} from './actions';

const redirectionErrorEpic = action$ =>
  action$.ofType(redirectionError.type)
    .pipe(
      mergeMap(({ payload }) => ([
        push('/'),
        updateNotification({
          open: true,
          type: payload.errorType || 'warning',
          message: payload.errorMessage || 'Sorry, your token has expired. Please login again'
        })
      ]))
    );

const signInEpic = (action$) =>
  action$.ofType(signIn.type)
  .pipe(
    mergeMap(action => observableDefer(_ => signInService(action.payload))
      .pipe(
        mergeMap(({ data }) => {
          if (data.success) {
            updateToken(data.auth.token);
            updateRefreshToken(data.auth.refreshToken);
            updateUser(data.user);
          };
          return data.success
            ? [
              push('/home'),
              updateStateUser({
                token: data.auth.token,
                refreshToken: data.auth.refreshToken,
                info: data.user
              }),
              reset('loginForm'),
              fetchPorts(),
              fetchCompanyVessels({companyId : 1})
            ]
            : [
              setSubmitFailed('loginForm'),
              resetSection('loginForm', 'password'),
              stopSubmit('loginForm', {
                _error: 'Incorrect Username or Password',
              }),
              toggleLoadingFalse()
            ]
        }),
        serverError(action$, refreshTokenSuccess, redirectionError, getNewAccessToken)
      )
    ),
  );

const getNewAccessTokenEpic = action$ =>
 action$.ofType(getNewAccessToken.type)
   .pipe(
     switchMap(_ => {
       const refreshToken = getRefreshToken();
       const { username } = getUser();
       return observableFrom(refreshTokenService({ username, refreshToken }))
         .pipe(
           flatMap(({ data: { token } }) => {
             updateToken(token);
             return [
               refreshTokenSuccess(),
               updateStateUser({ token })
             ];
           }),
           catchError(err => observableOf(
             redirectionError({ err })
           ))
         );
     })
   );

const homeEpic = combineEpics(
  redirectionErrorEpic,
  signInEpic,
  getNewAccessTokenEpic
);

 export default homeEpic;
