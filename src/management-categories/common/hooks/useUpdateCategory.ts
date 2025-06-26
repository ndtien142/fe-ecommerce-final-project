import { useMutation, useQueryClient } from 'react-query';
import { IFormEditCategory } from 'src/common/@types/product/category.interface';
import { API_CATEGORY } from 'src/common/constant/api.constant';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import axiosInstance from 'src/common/utils/axios';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IFormEditCategory) => axiosInstance.put(`${API_CATEGORY}/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.DETAIL_CATEGORY]);
      queryClient.invalidateQueries(QUERY_KEYS.CATEGORY_TREE);
      queryClient.invalidateQueries(QUERY_KEYS.LIST_CATEGORY);
    },
  });
};
