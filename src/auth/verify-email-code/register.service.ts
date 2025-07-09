import { API_RESEND_VERIFY_CODE, API_VERIFY_EMAIL_CODE } from 'src/common/constant/api.constant';
import { axiosInstance3 } from 'src/common/utils/axios';

export const resendVerifyCode = async (email: string) =>
  axiosInstance3.post<unknown, { message: string; emailSent: boolean }>(API_RESEND_VERIFY_CODE, {
    email,
  });

export const verifyEmailCode = async ({ email, code }: { email: string; code: string }) =>
  axiosInstance3.post<
    unknown,
    {
      message: string;
      user: {
        userId: number;
        email: string;
        username: string;
        emailVerified: boolean;
      };
    }
  >(API_VERIFY_EMAIL_CODE, {
    email,
    code,
  });

export const checkVerificationStatus = async (email: string) =>
  axiosInstance3.get<
    unknown,
    { email: string; emailVerified: boolean; hasCode: boolean; codeExpired: boolean }
  >(`${API_VERIFY_EMAIL_CODE}`, {
    data: { email },
  });
