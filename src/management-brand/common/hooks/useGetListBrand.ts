import { useQuery } from 'react-query';
// You should implement this service function elsewhere
import { getListBrand } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { ISimpleParams } from 'src/common/@types/common.interface';

export const useGetListBrand = (params: ISimpleParams) =>
  useQuery([QUERY_KEYS.LIST_BRAND, params], () => getListBrand(params));
