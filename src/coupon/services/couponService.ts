import axiosInstance from '../../common/utils/axios';
import {
  API_COUPON,
  API_COUPON_AVAILABLE,
  API_COUPON_VALIDATE,
  API_COUPON_MY_AVAILABLE,
  API_COUPON_GRANT_USER,
  API_COUPON_USER,
} from '../../common/constant/api.constant';
import {
  ICoupon,
  IUserCoupon,
  ICouponValidationData,
  ICouponValidationResult,
  ICouponParams,
  ICouponListResponse,
  IUserCouponListResponse,
  ICouponGrantData,
} from '../../common/@types/coupon/coupon.interface';

// Public APIs
export const getAvailableCoupons = async (params: ICouponParams = {}) => {
  const response = await axiosInstance.get<
    unknown,
    {
      message: string;
      metadata: ICouponListResponse;
    }
  >(API_COUPON_AVAILABLE, { params });
  return response.metadata || response;
};

// Authenticated APIs
export const validateCoupon = async (validationData: ICouponValidationData) => {
  const response = await axiosInstance.post<
    unknown,
    {
      message: string;
      metadata: ICouponValidationResult;
    }
  >(API_COUPON_VALIDATE, validationData);
  return response.metadata || response;
};

export const getMyAvailableCoupons = async (params: ICouponParams = {}) => {
  const response = await axiosInstance.get<
    unknown,
    {
      message: string;
      metadata: IUserCouponListResponse;
    }
  >(API_COUPON_MY_AVAILABLE, { params });
  return response.metadata || response;
};

// Admin APIs
export const createCoupon = async (couponData: Partial<ICoupon>) => {
  const response = await axiosInstance.post<
    unknown,
    {
      message: string;
      metadata: ICoupon;
    }
  >(API_COUPON, couponData);
  return response.metadata || response;
};

export const getCoupons = async (params: ICouponParams = {}) => {
  const response = await axiosInstance.get<
    unknown,
    {
      message: string;
      metadata: ICouponListResponse;
    }
  >(API_COUPON, { params });
  return response.metadata || response;
};

export const updateCoupon = async (id: number, couponData: Partial<ICoupon>) => {
  const response = await axiosInstance.put<
    unknown,
    {
      message: string;
      metadata: ICoupon;
    }
  >(` ${API_COUPON}/${id}`, couponData);
  return response.metadata || response;
};

export const deleteCoupon = async (id: number) => {
  const response = await axiosInstance.delete<
    unknown,
    {
      message: string;
    }
  >(`${API_COUPON}/${id}`);
  return response;
};

export const grantCouponToUser = async (grantData: ICouponGrantData) => {
  const response = await axiosInstance.post<
    unknown,
    {
      message: string;
      metadata: IUserCoupon;
    }
  >(API_COUPON_GRANT_USER, grantData);
  return response.metadata || response;
};

export const getUserCoupons = async (userId: number, params: ICouponParams = {}) => {
  const response = await axiosInstance.get<
    unknown,
    {
      message: string;
      metadata: IUserCouponListResponse;
    }
  >(`${API_COUPON_USER}/${userId}`, { params });
  return response.metadata || response;
};
