import { useMutation, useQueryClient } from 'react-query';
import { IWorkflowActionRequest } from 'src/common/@types/order/workflow.interface';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import {
  cancelOrder,
  completeCOD,
  confirmOrder,
  customerConfirmOrder,
  deliverOrder,
  pickupOrder,
  returnOrder,
} from 'src/management-order/service';

export const useConfirmOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, data }: { orderId: number; data: IWorkflowActionRequest }) =>
      confirmOrder(orderId, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.ORDER);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_WORKFLOW, variables.orderId]);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_LOGS, variables.orderId]);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      },
    }
  );
};

export const usePickupOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, data }: { orderId: number; data: IWorkflowActionRequest }) =>
      pickupOrder(orderId, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.ORDER);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_WORKFLOW, variables.orderId]);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_LOGS, variables.orderId]);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      },
    }
  );
};

export const useDeliverOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, data }: { orderId: number; data: IWorkflowActionRequest }) =>
      deliverOrder(orderId, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.ORDER);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_WORKFLOW, variables.orderId]);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_LOGS, variables.orderId]);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      },
    }
  );
};

export const useCustomerConfirmOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, data }: { orderId: number; data: IWorkflowActionRequest }) =>
      customerConfirmOrder(orderId, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.ORDER);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_WORKFLOW, variables.orderId]);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_LOGS, variables.orderId]);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      },
    }
  );
};

export const useCompleteCOD = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, data }: { orderId: number; data: IWorkflowActionRequest }) =>
      completeCOD(orderId, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.ORDER);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_WORKFLOW, variables.orderId]);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_LOGS, variables.orderId]);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      },
    }
  );
};

export const useReturnOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, data }: { orderId: number; data: IWorkflowActionRequest }) =>
      returnOrder(orderId, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.ORDER);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_WORKFLOW, variables.orderId]);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_LOGS, variables.orderId]);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      },
    }
  );
};

export const useCancelOrderWorkflow = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, data }: { orderId: number; data: IWorkflowActionRequest }) =>
      cancelOrder(orderId, data),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(QUERY_KEYS.ORDER);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_WORKFLOW, variables.orderId]);
        queryClient.invalidateQueries([QUERY_KEYS.ORDER_LOGS, variables.orderId]);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      },
    }
  );
};

export const useUpdateOrderStatusActions = (orderId: number) => {
  const confirmMutation = useConfirmOrder();
  const pickupMutation = usePickupOrder();
  const deliverMutation = useDeliverOrder();
  const customerConfirmMutation = useCustomerConfirmOrder();
  const completeCODMutation = useCompleteCOD();
  const returnMutation = useReturnOrder();
  const cancelMutation = useCancelOrderWorkflow();

  const executeAction = async (action: string, data: IWorkflowActionRequest) => {
    const payload = { orderId, data };

    switch (action) {
      case 'confirm':
        return confirmMutation.mutateAsync(payload);
      case 'pickup':
        return pickupMutation.mutateAsync(payload);
      case 'deliver':
        return deliverMutation.mutateAsync(payload);
      case 'customer-confirm':
        return customerConfirmMutation.mutateAsync(payload);
      case 'complete-cod':
        return completeCODMutation.mutateAsync(payload);
      case 'return':
        return returnMutation.mutateAsync(payload);
      case 'cancel':
        return cancelMutation.mutateAsync(payload);
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  };

  const isLoading = [
    confirmMutation.isLoading,
    pickupMutation.isLoading,
    deliverMutation.isLoading,
    customerConfirmMutation.isLoading,
    completeCODMutation.isLoading,
    returnMutation.isLoading,
    cancelMutation.isLoading,
  ].some(Boolean);

  return {
    executeAction,
    isLoading,
    mutations: {
      confirm: confirmMutation,
      pickup: pickupMutation,
      deliver: deliverMutation,
      customerConfirm: customerConfirmMutation,
      completeCOD: completeCODMutation,
      return: returnMutation,
      cancel: cancelMutation,
    },
  };
};
