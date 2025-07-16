import { useQuery } from 'react-query';
import { getListCoupon } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { ICouponParams } from 'src/common/@types/coupon/coupon.interface';

export const useGetListCoupon = (params: ICouponParams) =>
  useQuery([QUERY_KEYS.COUPON_LIST, params], () => getListCoupon(params), {
    keepPreviousData: true,
  });
