import { useQuery } from 'react-query';
import { IOrderWorkflowResponse } from 'src/common/@types/order/workflow.interface';
import { API_ORDER_WORKFLOW } from 'src/common/constant/api.constant';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import axiosInstance from 'src/common/utils/axios';

export const useGetWorkFlowActions = (orderId: number) =>
  useQuery(
    [QUERY_KEYS.ORDER_WORKFLOW_ACTIONS, orderId],
    () => axiosInstance.get<unknown, IOrderWorkflowResponse>(`${API_ORDER_WORKFLOW}/${orderId}`),
    {
      enabled: !!orderId,
    }
  );
