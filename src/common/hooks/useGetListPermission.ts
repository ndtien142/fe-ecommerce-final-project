import { useQuery } from 'react-query';
import axiosInstance from '../utils/axios';
import { API_PERMISSION } from '../constant/api.constant';
import { QUERY_KEYS } from '../constant/queryKeys.constant';
import { IPermissionListResponse } from '../@types/user/permission.interface';
import { ISimpleParams } from '../@types/common.interface';

export const getAllPermission = (params: ISimpleParams) =>
  axiosInstance.get<unknown, IPermissionListResponse>(API_PERMISSION, { params });

export const useGetAllPermission = (params: ISimpleParams) =>
  useQuery([QUERY_KEYS.LIST_PERMISSION, params], () => getAllPermission(params));
