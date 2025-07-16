import {
  IOrderAnalyticsResponse,
  IOrderListResponse,
  IOrderParams,
  IOrderResponse,
} from 'src/common/@types/order/order.interface';
import { IMoMoStatusResponse } from 'src/common/@types/payment/momo.interface';
import { API_MOMO_STATUS, API_ORDER } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const getListOrder = async (params: IOrderParams) =>
  axiosInstance.get<unknown, IOrderListResponse>(`${API_ORDER}/user`, { params });

export const getOrderAnalytics = () =>
  axiosInstance.get<unknown, IOrderAnalyticsResponse>(
    `${API_ORDER}/user/analytics/count-by-status`
  );

export const getOrderById = (id: number) =>
  axiosInstance.get<unknown, IOrderResponse>(`${API_ORDER}/user/${id}`);

// User-specific order management endpoints based on router
export const createOrderWithMoMo = async (orderData: any) =>
  axiosInstance.post<unknown, any>(`${API_ORDER}/momo`, orderData);

export const updateOrderAddress = async (orderId: number, addressId: number) =>
  axiosInstance.patch<unknown, any>(`${API_ORDER}/user/${orderId}/address`, { addressId });

export const checkMoMoPaymentStatus = async (orderId: number) =>
  axiosInstance.get<unknown, IMoMoStatusResponse>(`${API_MOMO_STATUS}/${orderId}`);

export const cancelOrder = async (orderId: number) =>
  axiosInstance.patch<unknown, any>(`${API_ORDER}/user/${orderId}/cancel`);
