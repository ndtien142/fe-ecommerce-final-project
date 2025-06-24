import { useMutation, useQueryClient } from 'react-query';
import { plusItemQuantity } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function usePlusItemQuantity() {
  const queryClient = useQueryClient();

  return useMutation(plusItemQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CART);
      queryClient.invalidateQueries(QUERY_KEYS.CART_COUNT);
    },
  });
}
