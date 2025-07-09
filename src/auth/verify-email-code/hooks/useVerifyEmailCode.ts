import { useMutation } from 'react-query';
import { verifyEmailCode } from '../register.service';

export const useVerifyEmailCode = () => useMutation(verifyEmailCode);
