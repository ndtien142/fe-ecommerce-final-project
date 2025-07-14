import {
  IOrderAnalyticsResponse,
  IOrderListResponse,
  IOrderParams,
  IOrderResponse,
} from 'src/common/@types/order/order.interface';
import { API_ORDER } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const getListOrder = async (params: IOrderParams) =>
  axiosInstance.get<unknown, IOrderListResponse>(`${API_ORDER}/admin`, { params });

export const getOrderAnalytics = () =>
  axiosInstance.get<unknown, IOrderAnalyticsResponse>(`${API_ORDER}/admin/count-by-status`);

export const getOrderById = (id: number) =>
  axiosInstance.get<unknown, IOrderResponse>(`${API_ORDER}/admin/${id}`);

// Add admin-specific MoMo and order management endpoints based on router
export const updateOrderStatus = async (orderId: number, status: string) =>
  axiosInstance.patch<unknown, any>(`${API_ORDER}/admin/${orderId}/status`, { status });

export const getOrderStatistics = async () =>
  axiosInstance.get<unknown, any>(`${API_ORDER}/admin/count-by-status`);

export const cancelOrderAdmin = async (orderId: number) =>
  axiosInstance.patch<unknown, any>(`${API_ORDER}/admin/${orderId}/cancel`);

export const checkMoMoPaymentStatus = async (orderId: number) =>
  axiosInstance.get<unknown, any>(`/v1/api/momo/status/${orderId}`);

export const processOrderRefund = async (orderId: number, amount?: number) =>
  axiosInstance.post<unknown, any>(`${API_ORDER}/admin/${orderId}/refund`, { amount });

export const getOrderStatusHistory = async (orderId: number) =>
  axiosInstance.get<unknown, any>(`${API_ORDER}/admin/${orderId}/history`);
