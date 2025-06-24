import { useMutation, useQueryClient } from 'react-query';
import { addToCart } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation(addToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CART);
      queryClient.invalidateQueries(QUERY_KEYS.CART_COUNT);
      queryClient.invalidateQueries(QUERY_KEYS.PRODUCT_DETAIL);
    },
  });
};
