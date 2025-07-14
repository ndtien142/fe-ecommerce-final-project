import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getOrderTimeline } from 'src/management-order/service';

export const useGetOrderTimeline = (orderId: number) =>
  useQuery([QUERY_KEYS.ORDER_TIMELINE, orderId], () => getOrderTimeline(orderId), {
    enabled: !!orderId,
  });
