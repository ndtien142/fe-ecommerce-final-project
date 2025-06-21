import { PaginationMeta } from '../common.interface';

export interface IUser {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  role: {
    id: string;
    name: string;
    description?: string;
    permissions: string[];
  };
  isBlock: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  profilePictureUrl?: string;
}
export interface ILoginResponse {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: IUser;
}

export interface IListUserResponse {
  message: string;
  status: number;
  metadata: {
    items: IUser[];
    meta: PaginationMeta;
  };
}

export interface IUserResponse {
  message: string;
  status: number;
  metadata: IUser;
}
