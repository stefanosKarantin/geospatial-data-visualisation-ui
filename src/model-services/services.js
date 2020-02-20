import axios from 'axios';

import { accessPoint } from './config';
import { getToken } from './storage';

const postService = (endPoint, hasToken) => payload =>
    axios.request({
        url: endPoint,
        method: 'post',
        baseURL: accessPoint,
        data: {
            ...payload
        },
        headers: {
            'Authorization': hasToken ? getToken() : undefined
        }
    });

export const signInService = postService('/auth/login', false);

export const logoutService = postService('/auth/logout', true);

export const registerService = postService('/auth/register', false);

export const refreshTokenService = postService('/auth/refresh', false);

export const fetchGeoJson = postService('/geo/getcretandata', true);