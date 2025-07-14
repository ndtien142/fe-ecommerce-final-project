import { useMutation, useQueryClient } from 'react-query';
import { cancelOrderAdmin } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useCancelOrderAdmin() {
  const queryClient = useQueryClient();

  return useMutation((orderId: number) => cancelOrderAdmin(orderId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
      queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
    },
  });
}
