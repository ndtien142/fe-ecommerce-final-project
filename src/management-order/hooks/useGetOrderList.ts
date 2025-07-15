import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getListOrder } from '../service';
import { IOrderParams } from 'src/common/@types/order/order.interface';

export const useGetListOrder = (params: IOrderParams) =>
  useQuery([QUERY_KEYS.ORDER, params], () => getListOrder(params), {
    keepPreviousData: true, // Giữ data cũ khi đang load data mới
    staleTime: 0, // Luôn refetch khi params thay đổi
  });
