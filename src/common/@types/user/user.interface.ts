import { PaginationMeta } from '../common.interface';

export interface IUser {
  userId: number;
  username: string;
  email: string;
  userStatus: 'normal' | 'pending' | 'blocked' | 'deleted' | 'suspended';
  emailVerified: boolean;
  userRegistered: string;
  role: {
    id: number;
    name: string;
  };
  profile: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    avatarUrl: string;
    createTime: string;
  } | null;
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
