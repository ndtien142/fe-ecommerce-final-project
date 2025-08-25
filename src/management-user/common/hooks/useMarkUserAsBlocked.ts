import { useMutation } from 'react-query';
import { ICallbackMutation } from 'src/common/@types/common.interface';
import { markUserAsBlocked } from '../user.service';

const useMarkUserAsBlocked = (callback: ICallbackMutation) =>
  useMutation(
    ({ userId, isBlock }: { userId: number; isBlock: boolean }) =>
      markUserAsBlocked({ userId, isBlock }),
    {
      onSuccess: () => {
        callback.onSuccess();
      },
      onError: (error) => {
        callback.onError();
        console.error(error);
      },
    }
  );

export default useMarkUserAsBlocked;
