import { useQuery } from 'react-query';
import { getCouponById } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useGetCouponDetail = (id: string) =>
  useQuery([QUERY_KEYS.COUPON_DETAIL, id], () => getCouponById(id), {
    enabled: !!id,
  });
