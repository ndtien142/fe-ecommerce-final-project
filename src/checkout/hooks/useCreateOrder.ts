import { useMutation } from 'react-query';
import { createOrder } from '../service';

export const useCreateOrder = () => useMutation(createOrder);
