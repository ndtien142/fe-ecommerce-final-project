import { useMutation } from 'react-query';
import { ICallbackMutation } from 'src/common/@types/common.interface';
import { createUser } from '../user.service';

const useCreateUser = (callback: ICallbackMutation) =>
  useMutation(createUser, {
    onSuccess: () => {
      callback.onSuccess();
    },
    onError: (error) => {
      callback.onError();
    },
  });

export default useCreateUser;
