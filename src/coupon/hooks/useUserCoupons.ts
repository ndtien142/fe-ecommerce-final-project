import { useState, useEffect } from 'react';
import { getMyAvailableCoupons } from '../services/couponService';
import { IUserCoupon, ICouponParams } from '../../common/@types/coupon/coupon.interface';

export const useUserCoupons = () => {
  const [userCoupons, setUserCoupons] = useState<IUserCoupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);

  const fetchUserCoupons = async (params: ICouponParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMyAvailableCoupons(params);
      setUserCoupons(response.userCoupons);
      setPagination(response.pagination);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshUserCoupons = () => {
    fetchUserCoupons();
  };

  return {
    userCoupons,
    loading,
    error,
    pagination,
    fetchUserCoupons,
    refreshUserCoupons,
  };
};
