import { IAddressResponse } from 'src/common/@types/address/address.interface';
import {
  IChangePasswordForm,
  IProfileResponse,
  IProfileUpdateForm,
} from 'src/common/@types/user/account.interface';
import { API_ACCOUNT, API_CHANGE_PASSWORD, API_USER } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const getUserProfile = async () =>
  axiosInstance.get<unknown, IProfileResponse>(`${API_ACCOUNT}/profile`);

export const updateUserProfile = async (data: IProfileUpdateForm) =>
  axiosInstance.put<unknown, IProfileUpdateForm>(`${API_ACCOUNT}/profile`, data);

export const getUserAddress = async () =>
  axiosInstance.get<unknown, IAddressResponse>(`${API_ACCOUNT}/address`);

export const updatePassword = async (data: IChangePasswordForm) =>
  axiosInstance.put(`${API_CHANGE_PASSWORD}`, data);
