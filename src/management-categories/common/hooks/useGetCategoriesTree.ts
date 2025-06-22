import { useQuery } from 'react-query';
import { getCategoriesTree } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useGetCategoriesTree = () => useQuery([QUERY_KEYS.CATEGORY_TREE], getCategoriesTree);
