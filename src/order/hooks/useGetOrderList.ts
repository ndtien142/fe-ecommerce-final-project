import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getListOrder } from '../service';
import { IOrderParams } from 'src/common/@types/order/order.interface';

export const useGetListOrder = (params: IOrderParams) =>
  useQuery([QUERY_KEYS.ORDER, params], () => getListOrder(params));
