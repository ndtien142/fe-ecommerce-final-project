import { useMutation } from 'react-query';
import { checkVerificationStatus } from '../register.service';

export const useCheckVerificationStatus = () => useMutation(checkVerificationStatus);
