import { useMutation } from 'react-query';
import { resendVerifyCode } from '../register.service';

export const useResendVerifyCode = () => useMutation(resendVerifyCode);
