import {
  IOrderAnalyticsResponse,
  IOrderListResponse,
  IOrderParams,
} from 'src/common/@types/order/order.interface';
import { API_ORDER } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const getListOrder = async (params: IOrderParams) =>
  axiosInstance.get<unknown, IOrderListResponse>(`${API_ORDER}/user`, { params });

export const getOrderAnalytics = () =>
  axiosInstance.get<unknown, IOrderAnalyticsResponse>(`${API_ORDER}/user/count-by-status`);
