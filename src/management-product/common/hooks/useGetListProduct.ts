import { ISimpleParams } from 'src/common/@types/common.interface';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getListProduct } from '../service';
import { useQuery } from 'react-query';

export const useGetListProduct = (params: ISimpleParams) =>
  useQuery([QUERY_KEYS.LIST_PRODUCT, params], () => getListProduct(params));
