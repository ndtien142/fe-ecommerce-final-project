import { CustomFile } from 'src/common/components/upload';

export interface IProfileResponse {
  message: string;
  metadata: IProfileUpdateForm;
  status: number;
}

export interface IProfileUpdateForm {
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatarUrl: CustomFile | string | null;
  address: string | null;
  province: string | null;
  district: string | null;
  ward: string | null;
  postalCode: string | null;
  bio: string | null;
  gender: string | null;
  nickname: string | null;
  dateOfBirth: string | null;
}

export interface IChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
