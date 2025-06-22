import { useMutation } from 'react-query';
import { createNewCategory } from '../service';

export const useCreateNewCategory = () => useMutation(createNewCategory);
