import { PaginationMeta } from '../common.interface';

export interface IUser {
  userCode: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  role: {
    id: string; // Unique identifier for the role
    name: string; // Name of the role
    description?: string; // Optional description of the role
    permissions: string[]; // List of permissions associated with the role
  };
  isBlock: boolean; // Indicates if the user is blocked
  isDeleted: boolean; // Indicates if the user account is deleted
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean; // Indicates if the user account is active
  profilePictureUrl?: string; // Optional field for user's profile picture
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
