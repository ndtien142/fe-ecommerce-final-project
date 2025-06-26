import { IAddressResponse } from 'src/common/@types/address/address.interface';
import { API_USER } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const getUserProfile = async () => axiosInstance.get(API_USER);

export const updateUserProfile = async (data: any) => {
  return axiosInstance.put(API_USER, data);
};

export const getUserAddress = async () =>
  axiosInstance.get<unknown, IAddressResponse>(`${API_USER}/address`);
