import axios from 'axios';
// config
import { HOST_API } from '../../config';
import { store } from '../redux/store';
import { PATH_AUTH } from '../routes/paths';
import { toQueryString } from './common.util';
import { setAccessToken, setRefreshToken } from 'src/auth/login/auth.slice';
import { setIsExpired } from 'src/auth/login/login.slice';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  paramsSerializer: (param) => toQueryString(param),
});
export const axiosInstance2 = axios.create({
  baseURL: HOST_API,
});
const axiosInstance3 = axios.create({
  baseURL: HOST_API,
  paramsSerializer: (param) => toQueryString(param),
});

axiosInstance3.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;
    if (response?.status === 4001) {
      store.dispatch(setIsExpired(true));
      window.location.href = PATH_AUTH.login;
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;
    const refreshToken = store.getState()?.auth.refreshToken;
    if (response?.status === 4001) {
      axiosInstance2
        .post<any, { accessToken: string }>('/refresh-token', {
          refreshToken: refreshToken,
        })
        .then((res: any) => {
          store.dispatch(setAccessToken('Bearer ' + res?.data?.metadata?.tokens?.accessToken));
          store.dispatch(setRefreshToken(res?.data?.metadata?.tokens?.refreshToken));
        })
        .catch((e) => {
          store.dispatch(setIsExpired(true));
          window.location.href = PATH_AUTH.login;
        });
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(async (config) => {
  const token = store.getState()?.auth.accessToken;
  const userId = store.getState()?.auth.user.userId;
  if (token) {
    try {
      // @ts-ignore
      config.headers = {
        ...config.headers,
        authorization: token,
        'x-user-id': userId,
      };
    } catch (e) {
      console.log(e);
    }
  }

  return {
    ...config,
  };
});

export { axiosInstance3 };

export default axiosInstance;
