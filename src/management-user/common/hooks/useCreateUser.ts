import { useMutation } from 'react-query';
import { ICallbackMutation } from 'src/common/@types/common.interface';
import { createUser } from '../user.service';
import { ICreateUserData } from '../user.interface';

const useCreateUser = (callback: ICallbackMutation) =>
  useMutation((data: ICreateUserData) => createUser(data), {
    onSuccess: () => {
      callback.onSuccess();
    },
    onError: (error) => {
      callback.onError();
    },
  });

export default useCreateUser;
