import { ISimpleParams } from 'src/common/@types/common.interface';
import {
  ICategoryTreeResponse,
  IFormCreateNewCategory,
  IListCategoriesResponse,
} from 'src/common/@types/product/category.interface';
import { API_CATEGORY } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const getListCategories = async (params: ISimpleParams) =>
  axiosInstance.get<unknown, IListCategoriesResponse>(API_CATEGORY, { params });

export const createNewCategory = async (data: IFormCreateNewCategory) =>
  axiosInstance.post(API_CATEGORY, data);

export const getCategoriesTree = async () =>
  axiosInstance.get<unknown, ICategoryTreeResponse>(`${API_CATEGORY}/tree`);
