import * as Yup from 'yup';

export const CreateNewCategorySchema = Yup.object().shape({
  name: Yup.string().required('Tên danh mục là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
  //   parentId: Yup.string().nullable().required('Danh mục cha là bắt buộc'),

  imageUrl: Yup.mixed().required('Hình ảnh là bắt buộc'),
  status: Yup.string()
    .oneOf(['active', 'inactive'], 'Trạng thái không hợp lệ')
    .required('Trạng thái là bắt buộc'),
});
