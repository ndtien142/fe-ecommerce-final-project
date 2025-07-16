import { useState, useEffect } from 'react';
import { getAvailableCoupons } from '../services/couponService';
import { ICoupon, ICouponParams } from '../../common/@types/coupon/coupon.interface';

export const useCoupon = () => {
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);

  const fetchAvailableCoupons = async (params: ICouponParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAvailableCoupons(params);
      setCoupons(response.coupons);
      setPagination(response.pagination);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableCoupons();
  }, []);

  return {
    coupons,
    loading,
    error,
    pagination,
    fetchAvailableCoupons,
  };
};
