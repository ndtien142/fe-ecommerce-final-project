import { ISimpleParams } from 'src/common/@types/common.interface';
import { IListCategoriesResponse } from 'src/common/@types/product/category.interface';
import { API_CATEGORY } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const getListCategories = async (params: ISimpleParams) =>
  axiosInstance.get<unknown, IListCategoriesResponse>(API_CATEGORY, { params });
