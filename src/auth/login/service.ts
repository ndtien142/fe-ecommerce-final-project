import { API_LOGIN, API_LOGOUT } from 'src/common/constant/api.constant';
import { IAuth, IResLogin } from './interface';
import { axiosInstance2 } from 'src/common/utils/axios';

export const getAuth = async (params: IAuth): Promise<IResLogin> => {
  const data = await axiosInstance2.post<unknown, IResLogin>(API_LOGIN, params);
  return data;
};

export const getLogout = () => axiosInstance2.post(API_LOGOUT);
