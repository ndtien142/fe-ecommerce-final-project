import { useMutation } from 'react-query';
import { updateUser } from '../user.service';
import { ICallbackMutation } from 'src/common/@types/common.interface';

const useUpdateUser = (callback: ICallbackMutation) =>
  useMutation(updateUser, {
    onSuccess: () => {
      callback.onSuccess();
    },
    onError: (error) => {
      callback.onError();
      console.error(error);
    },
  });

export default useUpdateUser;
