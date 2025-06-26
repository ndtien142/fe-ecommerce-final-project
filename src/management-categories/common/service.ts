import { ISimpleParams } from 'src/common/@types/common.interface';
import {
  ICategoryDetailResponse,
  ICategoryTreeResponse,
  IFormCreateNewCategory,
  IListCategoriesResponse,
} from 'src/common/@types/product/category.interface';
import { API_CATEGORY } from 'src/common/constant/api.constant';
import axiosInstance, { axiosInstance3 } from 'src/common/utils/axios';

export const getListCategories = async (params: ISimpleParams) =>
  axiosInstance.get<unknown, IListCategoriesResponse>(API_CATEGORY, { params });

export const createNewCategory = async (data: IFormCreateNewCategory) =>
  axiosInstance.post(API_CATEGORY, data);

export const getCategoriesTree = async () =>
  axiosInstance3.get<unknown, ICategoryTreeResponse>(`${API_CATEGORY}/tree`);

export const getDetailCategory = async (categoryId: number) =>
  axiosInstance.get<unknown, ICategoryDetailResponse>(`${API_CATEGORY}/${categoryId}`);
