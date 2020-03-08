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

// import _ from 'lodash';

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

    resetToken,
    resetRefreshToken,
    resetUser,

    signInService,
    logoutService,
    registerService,
    refreshTokenService,
    fetchGeoJson
} from 'model-services';

import {
    redirectionError,
    signIn,
    logout,
    register,
    googleLogin,
    getNewAccessToken,
    refreshTokenSuccess,
    updateStateUser,
    toggleLoadingFalse,
    updateNotification,
    getGeoData,
    updateGeoData,
    updateFilters
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
        }),
        toggleLoadingFalse()
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
              toggleLoadingFalse()
            ]
            : [
              setSubmitFailed('loginForm'),
              resetSection('loginForm', 'password'),
              stopSubmit('loginForm', {
                _error: data.data.message,
              }),
              toggleLoadingFalse()
            ]
        }),
        serverError(action$, refreshTokenSuccess, redirectionError, getNewAccessToken)
      )
    ),
  );

const logoutEpic = action$ =>
    action$.ofType(logout.type)
        .pipe(
            mergeMap(action => observableDefer(_ => logoutService())
                .pipe(
                    mergeMap(data => {
                        if (data.data.success) {
                            resetToken();
                            resetRefreshToken();
                            resetUser();
                        };

                        return data.data.success
                            ? [
                                updateStateUser(),
                                push('/'),
                                toggleLoadingFalse()
                            ]
                            : [
                                toggleLoadingFalse()
                            ]
                    })
                )
            )
        )
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
                            toggleLoadingFalse()
                        ]
                        : [
                            setSubmitFailed('registerForm'),
                            resetSection('registerForm', 'password'),
                            resetSection('registerForm', 'confirm'),
                            stopSubmit('registerForm', {
                                _error: data.data.message,
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
                    }),
                    toggleLoadingFalse()
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
                        updateStateUser({ token }),
                        toggleLoadingFalse()
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
                        mergeMap(({data}) => ([
                            updateFilters(data.rasterValues.reduce((acc, cur) => ({
                                ...acc,
                                [cur]: {
                                    checked: true,
                                    value: cur,
                                    label: cur
                                }
                            }),{})),
                            updateGeoData(data.polygons),
                            toggleLoadingFalse()
                        ]))
                    )
            )
        );

const homeEpic = combineEpics(
  redirectionErrorEpic,
  signInEpic,
  logoutEpic,
  registerEpic,
  googleLoginEpic,
  getNewAccessTokenEpic,
  getGeoJsonEpic
);

 export default homeEpic;
