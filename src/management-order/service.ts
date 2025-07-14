import { IOrderTimelineResponse } from 'src/common/@types/order/logs.interface';
import {
  IOrderAnalyticsResponse,
  IOrderListResponse,
  IOrderParams,
  IOrderResponse,
} from 'src/common/@types/order/order.interface';
import {
  IWorkflowActionRequest,
  IWorkflowActionResponse,
} from 'src/common/@types/order/workflow.interface';
import { API_LOGS, API_ORDER, API_ORDER_WORKFLOW } from 'src/common/constant/api.constant';
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

// Workflow update functions
/**
 * Confirm order (Admin action)
 */
export const confirmOrder = (orderId: number, data: IWorkflowActionRequest) =>
  axiosInstance.post<unknown, IWorkflowActionResponse>(
    `${API_ORDER_WORKFLOW}/${orderId}/confirm`,
    data
  );

export const pickupOrder = (orderId: number, data: IWorkflowActionRequest) =>
  axiosInstance.post<unknown, IWorkflowActionResponse>(
    `${API_ORDER_WORKFLOW}/${orderId}/pickup`,
    data
  );

export const deliverOrder = (orderId: number, data: IWorkflowActionRequest) =>
  axiosInstance.post<unknown, IWorkflowActionResponse>(
    `${API_ORDER_WORKFLOW}/${orderId}/deliver`,
    data
  );

export const customerConfirmOrder = (orderId: number, data: IWorkflowActionRequest) =>
  axiosInstance.post<unknown, IWorkflowActionResponse>(
    `${API_ORDER_WORKFLOW}/${orderId}/customer-confirm`,
    data
  );

export const completeCOD = (orderId: number, data: IWorkflowActionRequest) =>
  axiosInstance.post<unknown, IWorkflowActionResponse>(
    `${API_ORDER_WORKFLOW}/${orderId}/complete-cod`,
    data
  );

export const returnOrder = (orderId: number, data: IWorkflowActionRequest) =>
  axiosInstance.post<unknown, IWorkflowActionResponse>(
    `${API_ORDER_WORKFLOW}/${orderId}/return`,
    data
  );

export const cancelOrder = (orderId: number, data: IWorkflowActionRequest) =>
  axiosInstance.post<unknown, IWorkflowActionResponse>(
    `${API_ORDER_WORKFLOW}/${orderId}/cancel`,
    data
  );

// Get logs for order timeline
export const getOrderTimeline = (orderId: number) =>
  axiosInstance.get<unknown, IOrderTimelineResponse>(`${API_LOGS}/${orderId}/timeline`);
