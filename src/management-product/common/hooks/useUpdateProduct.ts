import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { updateProduct } from '../service';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.PRODUCT_DETAIL]);
      queryClient.invalidateQueries([QUERY_KEYS.LIST_PRODUCT]);
    },
    onError: (error) => {
      console.error('Error updating product:', error);
    },
  });
};
