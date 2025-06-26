import { useMutation } from 'react-query';
import { updatePassword } from '../services';

export const useChangePassword = () => useMutation(updatePassword);
