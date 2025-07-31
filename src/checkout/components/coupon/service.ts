import {
  ICouponListResponse,
  ICouponParams,
  ICouponValidationData,
  ICouponValidationResult,
  IUserCouponListResponse,
} from 'src/common/@types/coupon/coupon.interface';
import {
  API_COUPON,
  API_COUPON_AVAILABLE,
  API_COUPON_VALIDATE,
} from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const getMyAvailableCoupons = async (params: ICouponParams = {}) =>
  axiosInstance.get<unknown, IUserCouponListResponse>(`${API_COUPON}/my-available`, { params });

export const getSystemCoupons = async (params: ICouponParams = {}) =>
  axiosInstance.get<unknown, ICouponListResponse>(`${API_COUPON_AVAILABLE}`, { params });

export const validateSystemCoupon = async (validationData: ICouponValidationData) =>
  axiosInstance.post<unknown, ICouponValidationResult>(`${API_COUPON_VALIDATE}`, validationData);
