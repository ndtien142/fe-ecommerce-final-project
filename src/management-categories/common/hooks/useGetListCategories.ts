import { useQuery } from 'react-query';
import { ISimpleParams } from 'src/common/@types/common.interface';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getListCategories } from '../service';

export const useGetListCategories = (params: ISimpleParams) =>
  useQuery([QUERY_KEYS.LIST_CATEGORY], () => getListCategories(params));
