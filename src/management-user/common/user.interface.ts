export interface ICreateUserData {
  username: string;
  password: string;
  email: string;
  roleId: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
}

export interface ICreateAdminData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
}

export interface IUpdateUserData {
  userId: number;
  username?: string;
  email?: string;
  roleId?: number;
  userStatus?: 'normal' | 'pending' | 'blocked' | 'deleted' | 'suspended';
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
}

export interface IUpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
}

export interface IParamsUser {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  roleName?: string;
}
