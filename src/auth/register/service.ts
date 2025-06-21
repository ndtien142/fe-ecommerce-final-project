import { API_CUSTOMER_REGISTER } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';
import { IResLogin } from '../login/interface';

export const registerNewAccount = async (data: any) =>
  axiosInstance.post<unknown, IResLogin>(API_CUSTOMER_REGISTER, data);
