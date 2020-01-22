import axios from 'axios';

import { accessPoint } from './config';
import { getToken } from './storage';

const postService = (endPoint, hasToken) => payload =>
  axios.request({
      url: endPoint,
      method: 'post',
      baseURL: accessPoint,
      data: {
        token: hasToken ? getToken() : undefined,
        ...payload
      }
  });

export const signInService = postService('/authenticate', false);

export const refreshTokenService = postService('/token', false);
