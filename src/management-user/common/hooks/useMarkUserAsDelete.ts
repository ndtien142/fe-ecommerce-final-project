import { useMutation } from 'react-query';
import { markUserAsDeleted } from '../user.service';
import { ICallbackMutation } from 'src/common/@types/common.interface';

const useMarkUserAsDeleted = (callback: ICallbackMutation) =>
  useMutation((userId: number) => markUserAsDeleted(userId), {
    onSuccess: () => {
      callback.onSuccess();
    },
    onError: (error) => {
      callback.onError();
      console.error(error);
    },
  });

export default useMarkUserAsDeleted;
