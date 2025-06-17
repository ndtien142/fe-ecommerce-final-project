import axiosInstance from 'src/common/utils/axios';
import { ICreateUserData, IParamsUser, IUpdateUserData } from './user.interface';
import { API_USER } from 'src/common/constant/api.constant';
import { IListUserResponse, IUserResponse } from 'src/common/@types/user/user.interface';

export const fetchUsers = async (params: IParamsUser) => {
  const response = await axiosInstance.get<unknown, IListUserResponse>(API_USER, { params });
  return response;
};

export const fetchUser = async (userCode: string) => {
  const response = await axiosInstance.get<unknown, IUserResponse>(`${API_USER}/${userCode}`);
  return response;
};

export const markUserAsBlocked = async ({
  userCode,
  isBlock,
}: {
  userCode: string;
  isBlock: boolean;
}) => {
  const response = await axiosInstance.patch<unknown, IUserResponse>(
    `${API_USER}/${userCode}/block`,
    { isBlock }
  );
  return response;
};

export const updateUser = async (data: IUpdateUserData) => {
  const response = await axiosInstance.put<unknown, IUserResponse>(
    `${API_USER}/${data.userCode}`,
    data
  );
  return response;
};

export const markUserAsDeleted = async (userCode: string) => {
  const response = await axiosInstance.patch<unknown, IUserResponse>(
    `${API_USER}/${userCode}/delete`
  );
  return response;
};

export const createUser = async (data: ICreateUserData) => {
  const response = await axiosInstance.post<unknown, IUserResponse>(API_USER, data);
  return response;
};
