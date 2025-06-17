export type Fields = 'ALL' | 'WOOD';
export type Lang = 'en' | 'vi';
export type FileType = 'png' | 'jpg' | 'jpeg' | 'pdf';

export enum LANG {
  VI = 'vi',
  EN = 'en',
}
export interface PresignedResponse {
  id: number;
  url: string;
}
export interface BaseResponse {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  version: number;
  id: number;
}
export interface ImageResponse {
  id: number;
  key: string;
  type: FileType;
  url: string | null;
  fileName?: string;
}

export interface ThumbnailCategory {
  id: number;
  url: string | null;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
}

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface LangObj {
  label: string;
  value: Lang;
  icon: string;
}
export interface SearchParams {
  page?: number;
  size?: number;
  keyWord?: string;
  field?: Fields;
}

export type ISelectedLang = {
  payload: LangObj;
  type: string;
};

export enum MessageType {
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface IShowMessage {
  type: MessageType;
  message: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface MutationCallback {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
}

export interface DeleteMultipleResponse {
  affected: number;
}

export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum Resource {
  ALL = 'all',
  PRODUCT = 'product',
  USER_PRODUCT = 'user_product',
  USER_PROFILE = 'user_profile',
  PURCHASE = 'purchase',
  CUSTOMER = 'customer',
  ORDER = 'order',
  CART = 'cart',
  CHECKOUT = 'checkout',
  CATEGORY = 'category',
  STATISTICAL = 'statistical',
  HELP = 'help',
}

export enum ActionAbility {
  CAN = 'can',
  CANNOT = 'cannot',
}
