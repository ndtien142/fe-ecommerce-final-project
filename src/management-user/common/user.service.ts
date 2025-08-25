import axiosInstance from 'src/common/utils/axios';
import {
  ICreateUserData,
  ICreateAdminData,
  IParamsUser,
  IUpdateUserData,
  IUpdateProfileData,
} from './user.interface';
import { API_USER } from 'src/common/constant/api.constant';
import { IListUserResponse, IUserResponse } from 'src/common/@types/user/user.interface';

export const fetchUsers = async (params: IParamsUser) => {
  const response = await axiosInstance.get<unknown, IListUserResponse>(API_USER, { params });
  return response;
};

export const fetchUser = async (userId: number) => {
  const response = await axiosInstance.get<unknown, IUserResponse>(`${API_USER}/${userId}`);
  return response;
};

export const fetchCurrentUserProfile = async () => {
  const response = await axiosInstance.get<unknown, IUserResponse>(`${API_USER}/profile`);
  return response;
};

export const markUserAsBlocked = async ({
  userId,
  isBlock,
}: {
  userId: number;
  isBlock: boolean;
}) => {
  const response = await axiosInstance.patch<unknown, IUserResponse>(
    `${API_USER}/${userId}/block`,
    { isBlock }
  );
  return response;
};

export const updateUser = async (data: IUpdateUserData) => {
  const { userId, ...updateData } = data;
  const response = await axiosInstance.put<unknown, IUserResponse>(
    `${API_USER}/${userId}`,
    updateData
  );
  return response;
};

export const updateCurrentUserProfile = async (data: IUpdateProfileData) => {
  const response = await axiosInstance.put<unknown, IUserResponse>(`${API_USER}/profile`, data);
  return response;
};

export const markUserAsDeleted = async (userId: number) => {
  const response = await axiosInstance.patch<unknown, IUserResponse>(
    `${API_USER}/${userId}/delete`
  );
  return response;
};

export const createUser = async (data: ICreateUserData) => {
  const response = await axiosInstance.post<unknown, IUserResponse>(API_USER, data);
  return response;
};

export const createAdmin = async (data: ICreateAdminData) => {
  const response = await axiosInstance.post<unknown, IUserResponse>(`${API_USER}/admin`, data);
  return response;
};
