import { useMutation } from 'react-query';
import { createOrderWithMoMo } from '../service';
import { IFormCreateMoMoOrder } from 'src/common/@types/payment/momo.interface';

export const useCreateMoMoOrder = () =>
  useMutation((data: IFormCreateMoMoOrder) => createOrderWithMoMo(data));
