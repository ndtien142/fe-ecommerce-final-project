import { useMutation } from 'react-query';
import { markUserAsBlocked } from '../user.service';
import { ICallbackMutation } from 'src/common/@types/common.interface';

export const useBlockUser = (callback: ICallbackMutation) =>
  useMutation(markUserAsBlocked, {
    onSuccess: () => {
      callback.onSuccess();
    },
    onError: (error) => {
      callback.onError();
      console.error(error);
    },
  });
