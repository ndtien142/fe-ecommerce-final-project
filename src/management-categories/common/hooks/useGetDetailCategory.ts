import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getDetailCategory } from '../service';

export const useGetDetailCategory = (categoryId: number) =>
  useQuery([QUERY_KEYS.DETAIL_CATEGORY, categoryId], () => getDetailCategory(categoryId));
