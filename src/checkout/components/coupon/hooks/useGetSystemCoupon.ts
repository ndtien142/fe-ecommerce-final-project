import { useQuery } from 'react-query';
import { ICouponParams } from 'src/common/@types/coupon/coupon.interface';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getSystemCoupons } from '../service';

export const useGetSystemCoupon = (params: ICouponParams = {}) =>
  useQuery([QUERY_KEYS.COUPON_SYSTEM_AVAILABLE, params], () => getSystemCoupons(params), {
    select: (data) => ({
      items: data.metadata?.items ?? [],
      meta: data.metadata?.meta ?? null,
    }),
  });
