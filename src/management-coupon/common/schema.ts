import * as Yup from 'yup';

export const CouponSchema = Yup.object().shape({
  code: Yup.string()
    .min(3, 'Mã giảm giá phải có ít nhất 3 ký tự')
    .max(50, 'Mã giảm giá không được vượt quá 50 ký tự')
    .required('Mã giảm giá là bắt buộc'),
  name: Yup.string()
    .min(3, 'Tên coupon phải có ít nhất 3 ký tự')
    .max(200, 'Tên coupon không được vượt quá 200 ký tự')
    .required('Tên coupon là bắt buộc'),
  description: Yup.string()
    .max(500, 'Mô tả không được vượt quá 500 ký tự')
    .required('Mô tả là bắt buộc'),
  type: Yup.string()
    .oneOf(['percent', 'fixed', 'free_shipping'], 'Loại coupon không hợp lệ')
    .required('Loại coupon là bắt buộc'),
  value: Yup.number().min(0, 'Giá trị phải lớn hơn hoặc bằng 0').required('Giá trị là bắt buộc'),
  minOrderAmount: Yup.number().min(0, 'Đơn hàng tối thiểu phải lớn hơn hoặc bằng 0').nullable(),
  maxDiscountAmount: Yup.number().min(0, 'Giá trị giảm tối đa phải lớn hơn hoặc bằng 0').nullable(),
  usageLimit: Yup.number().min(1, 'Giới hạn sử dụng phải lớn hơn 0').nullable(),
  usageLimitPerUser: Yup.number().min(1, 'Giới hạn sử dụng mỗi người phải lớn hơn 0').nullable(),
  startDate: Yup.date().required('Ngày bắt đầu là bắt buộc'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'Ngày kết thúc phải sau ngày bắt đầu')
    .required('Ngày kết thúc là bắt buộc'),
  isActive: Yup.boolean().required('Trạng thái là bắt buộc'),
  firstOrderOnly: Yup.boolean(),
});
