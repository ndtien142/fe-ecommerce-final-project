import { getMyAvailableCoupons } from '../services/couponService';
import { ICouponParams } from '../../common/@types/coupon/coupon.interface';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useUserCoupons = (params: ICouponParams = {}) => {
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery([QUERY_KEYS.COUPON_MY_AVAILABLE, params], () => getMyAvailableCoupons(params), {
    keepPreviousData: true,
  });

  const userCoupons = data?.metadata?.items ?? [];
  const pagination = data?.metadata?.meta ?? null;

  const refreshUserCoupons = () => {
    refetch();
  };

  return {
    userCoupons,
    loading,
    error,
    pagination,
    fetchUserCoupons: refetch,
    refreshUserCoupons,
  };
};
