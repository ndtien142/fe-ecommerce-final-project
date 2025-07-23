import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getMyAvailableCoupons } from '../service';
import { ICouponParams } from 'src/common/@types/coupon/coupon.interface';
import { useQuery } from 'react-query';

export const useGetUserCoupon = (params: ICouponParams = {}) =>
  useQuery([QUERY_KEYS.COUPON_MY_AVAILABLE, params], () => getMyAvailableCoupons(params), {
    keepPreviousData: true,
    select: (data) => ({
      items: data.metadata?.items ?? [],
      meta: data.metadata?.meta ?? null,
    }),
  });
