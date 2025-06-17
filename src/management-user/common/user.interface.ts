export interface ICreateUserData {
  username: string;
  roleId: number;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  avatarUrl?: File | null | string;
}

export interface IUpdateUserData {
  userCode: string;
  username: string;
  roleId: number;
  isActive: boolean;
  isBlock: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  avatarUrl?: File | null | string;
}

export interface IParamsUser {
  page: number;
  limit: number;
  search?: string;
  roleId?: number;
  isActive?: boolean;
  isBlock?: boolean;
}
