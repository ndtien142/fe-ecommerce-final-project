import { useQuery } from 'react-query';
import { getOrderStatusHistory } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useGetOrderStatusHistory(orderId: number) {
  return useQuery([QUERY_KEYS.ORDER_HISTORY, orderId], () => getOrderStatusHistory(orderId), {
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
}
