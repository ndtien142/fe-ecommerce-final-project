import { useMutation, useQueryClient } from 'react-query';
import { cancelOrder } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation((orderId: number) => cancelOrder(orderId), {
    onSuccess: () => {
      // Invalidate relevant queries to refresh the UI
      queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
      queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      queryClient.invalidateQueries(QUERY_KEYS.ORDER);
    },
    onError: (error: any) => {
      console.error('Error cancelling order:', error);
    },
  });
}
