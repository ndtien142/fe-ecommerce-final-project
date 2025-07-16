import {
  ICoupon,
  ICouponListResponse,
  ICouponValidationResult,
  ICouponParams,
} from 'src/common/@types/coupon/coupon.interface';
import { API_COUPON } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const createNewCoupon = async (data: Omit<ICoupon, 'id'>) =>
  axiosInstance.post(API_COUPON, data);

export const getListCoupon = async (params: ICouponParams) =>
  axiosInstance.get<unknown, ICouponListResponse>(API_COUPON, { params });

export const getCouponById = async (id: string) =>
  axiosInstance.get<unknown, ICoupon>(`${API_COUPON}/${id}`);

export const updateCoupon = async (id: string, data: Omit<ICoupon, 'id'>) =>
  axiosInstance.put(`${API_COUPON}/${id}`, data);

export const deleteCoupon = async (id: string) => axiosInstance.delete(`${API_COUPON}/${id}`);

export const validateCoupon = async (code: string, cartTotal: number) =>
  axiosInstance.post<unknown, ICouponValidationResult>(`${API_COUPON}/validate`, {
    code,
    cartTotal,
  });

export const toggleCouponStatus = async (id: string) =>
  axiosInstance.patch(`${API_COUPON}/${id}/toggle-status`);
