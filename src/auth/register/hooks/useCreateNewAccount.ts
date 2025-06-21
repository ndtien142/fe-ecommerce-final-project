import { useMutation } from 'react-query';
import { registerNewAccount } from '../service';

export const useCreateNewAccount = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) =>
  useMutation(registerNewAccount, {
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      if (options?.onError) {
        options.onError(error);
      }
    },
    ...options,
  });
