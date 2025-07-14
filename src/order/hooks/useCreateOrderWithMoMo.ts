import { useMutation, useQueryClient } from 'react-query';
import { createOrderWithMoMo } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useCreateOrderWithMoMo() {
  const queryClient = useQueryClient();

  return useMutation((orderData: any) => createOrderWithMoMo(orderData), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
      queryClient.invalidateQueries(QUERY_KEYS.CART);
      queryClient.invalidateQueries(QUERY_KEYS.CART_COUNT);
    },
  });
}
