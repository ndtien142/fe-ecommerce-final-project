import { useMutation } from 'react-query';
import { crateNewBrand } from '../service';

export const useCreateNewBrand = () => useMutation(crateNewBrand);
