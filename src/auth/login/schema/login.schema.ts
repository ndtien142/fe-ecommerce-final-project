import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, 'Tên đăng nhập phải lớn hơn 8 kí tự')
    .required('Bắt buộc nhập tên đăng nhập'),
  password: yup.string().required('Yêu cầu nhập mật khẩu'),
  remember: yup.boolean(),
});
