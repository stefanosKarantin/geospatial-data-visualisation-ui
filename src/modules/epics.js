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
  registerService,
  refreshTokenService,
  fetchGeoJson
} from 'model-services';

import {
  redirectionError,
  signIn,
  register,
  googleLogin,
  getNewAccessToken,
  refreshTokenSuccess,
  updateStateUser,
  toggleLoadingFalse,
  updateNotification,
  getGeoData,
  updateGeoData
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
        mergeMap((data) => {

          if (data.data.success) {
            updateToken(data.data.auth_token);
            updateRefreshToken(data.data.auth_refresh_token);
            updateUser(data.data.email);
          };

          return data.data.success
            ? [
              push('/dashboard'),
              updateStateUser({
                token: data.data.auth_token,
                refreshToken: data.data.auth_refresh_token,
                info: data.user
              }),
              reset('loginForm'),
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

const registerEpic = (action$) =>
    action$.ofType(register.type)
        .pipe(
            mergeMap(action => observableDefer(_ => registerService(action.payload))
                .pipe(
                    mergeMap((data) => {

                        if (data.data.success) {
                            updateToken(data.data.auth_token);
                            updateRefreshToken(data.data.auth_refresh_token);
                            updateUser(data.data.email);
                        };

                        return data.data.success
                        ? [
                            push('/dashboard'),
                            updateStateUser({
                                token: data.data.auth_token,
                                refreshToken: data.data.auth_refresh_token,
                                info: data.user
                            }),
                            reset('registerForm'),
                        ]
                        : [
                            setSubmitFailed('registerForm'),
                            resetSection('registerForm', 'password'),
                            resetSection('registerForm', 'confirm'),
                            stopSubmit('registerForm', {
                                _error: 'Sign up failed. Please try again later',
                            }),
                            toggleLoadingFalse()
                        ]
                    }),
                    serverError(action$, refreshTokenSuccess, redirectionError, getNewAccessToken)
                )
            ),
        );


const googleLoginEpic = (action$) =>
    action$.ofType(googleLogin.type)
        .pipe(
            mergeMap(action => {
                const {
                    accessToken,
                    tokenId,
                    email
                } = action.payload;
                updateToken(accessToken);
                updateRefreshToken(tokenId);
                updateUser(email);

                return [
                    push('/dashboard'),
                    updateStateUser({
                        token: accessToken,
                        refreshToken: tokenId,
                        info: email
                    })
                ];
            }),
            serverError(action$, refreshTokenSuccess, redirectionError, getNewAccessToken)
        );

const getNewAccessTokenEpic = action$ =>
 action$.ofType(getNewAccessToken.type)
   .pipe(
     switchMap(_ => {
       const refreshToken = getRefreshToken();
       const { email } = getUser();
       return observableFrom(refreshTokenService({ email, refreshToken }))
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

const getGeoJsonEpic = action$ =>
    action$.ofType(getGeoData.type)
        .pipe(
            mergeMap(_ =>
                observableFrom(fetchGeoJson())
                    .pipe(
                        mergeMap(({data}) => {
                            console.log(data)
                            return [toggleLoadingFalse()]
                        })
                    )
            )
        );
const homeEpic = combineEpics(
  redirectionErrorEpic,
  signInEpic,
  registerEpic,
  googleLoginEpic,
  getNewAccessTokenEpic
);

 export default homeEpic;
