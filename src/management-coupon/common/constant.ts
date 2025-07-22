export const TABLE_COUPON_HEAD = [
  { id: 'code', label: 'Mã giảm giá', align: 'left' },
  { id: 'name', label: 'Tên coupon', align: 'left' },
  { id: 'type', label: 'Loại', align: 'center' },
  { id: 'value', label: 'Giá trị', align: 'center' },
  { id: 'minOrderAmount', label: 'Đơn hàng tối thiểu', align: 'center' },
  { id: 'usageLimit', label: 'Giới hạn sử dụng', align: 'center' },
  { id: 'startDate', label: 'Ngày bắt đầu', align: 'center' },
  { id: 'endDate', label: 'Ngày kết thúc', align: 'center' },
  { id: 'isActive', label: 'Trạng thái', align: 'center' },
  { id: '' },
];

export const COUPON_TYPE_OPTIONS = [
  { value: 'percent', label: 'Phần trăm' },
  { value: 'fixed', label: 'Số tiền cố định' },
  { value: 'free_shipping', label: 'Miễn phí vận chuyển' },
];

export const COUPON_STATUS_OPTIONS = [
  { value: true, label: 'Đang hoạt động' },
  { value: false, label: 'Đã tắt' },
];
