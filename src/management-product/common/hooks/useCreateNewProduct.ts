import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { createNewProduct } from '../service';

export const useCreateNewProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(createNewProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.LIST_PRODUCT);
    },
  });
};
