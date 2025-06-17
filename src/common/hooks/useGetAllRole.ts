import { useQuery } from 'react-query';
import axiosInstance from '../utils/axios';
import { API_ROLE } from '../constant/api.constant';
import { QUERY_KEYS } from '../constant/queryKeys.constant';
import { IRoleListResponse } from '../@types/user/role.interface';
import { ISimpleParams } from '../@types/common.interface';

export const getAllRole = (params: ISimpleParams) =>
  axiosInstance.get<unknown, IRoleListResponse>(API_ROLE, { params });

export const useGetAllRole = (params: ISimpleParams) =>
  useQuery([QUERY_KEYS.LIST_ROLE, params], () => getAllRole(params));
