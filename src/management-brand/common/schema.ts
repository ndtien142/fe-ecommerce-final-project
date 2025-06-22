import * as Yup from 'yup';

export const BrandSchema = Yup.object().shape({
  name: Yup.string().required('Tên thương hiệu là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  logoUrl: Yup.mixed().required('Logo là bắt buộc'),
  status: Yup.string()
    .oneOf(['active', 'inactive'], 'Trạng thái không hợp lệ')
    .required('Trạng thái là bắt buộc'),
});
