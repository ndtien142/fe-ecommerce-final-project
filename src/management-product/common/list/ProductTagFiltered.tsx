import { Box, Chip, Stack, Typography } from '@mui/material';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  filters: {
    name: string;
    brand: string;
    category: string;
    status: string;
    flag: string;
    startDate: Date | null;
    endDate: Date | null;
  };
  isShowReset: boolean;
  onResetAll: () => void;
  onRemoveName: () => void;
  onRemoveBrand: () => void;
  onRemoveCategory: () => void;
  onRemoveStatus: () => void;
  onRemoveFlag: () => void;
  onRemoveStartDate: () => void;
  onRemoveEndDate: () => void;
};

// Labels for display
const STATUS_LABELS = {
  all: 'Tất cả trạng thái',
  active: 'Hoạt động',
  inactive: 'Ngừng hoạt động',
  archived: 'Lưu trữ',
};

const FLAG_LABELS = {
  all: 'Tất cả flag',
  none: 'Không có',
  new: 'Mới',
  popular: 'Phổ biến',
  featured: 'Nổi bật',
  on_sale: 'Khuyến mãi',
};

const BRAND_LABELS = {
  all: 'Tất cả thương hiệu',
  IKEA: 'IKEA',
  Jysk: 'Jysk',
  Lotte: 'Lotte',
  'Duy Tân': 'Duy Tân',
  'Hòa Phát': 'Hòa Phát',
};

const CATEGORY_LABELS = {
  all: 'Tất cả danh mục',
  'ban-ghe': 'Bàn ghế',
  'giuong-tu': 'Giường tủ',
  'trang-tri': 'Trang trí',
  'den-chieu-sang': 'Đèn chiếu sáng',
  'phu-kien-nha-bep': 'Phụ kiện nhà bếp',
};

export default function ProductTagFiltered({
  filters,
  isShowReset,
  onResetAll,
  onRemoveName,
  onRemoveBrand,
  onRemoveCategory,
  onRemoveStatus,
  onRemoveFlag,
  onRemoveStartDate,
  onRemoveEndDate,
}: Props) {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <Stack spacing={1.5} direction="row" sx={{ p: 1 }}>
      {filters.name && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2">Tên:</Typography>
          <Chip
            size="small"
            label={filters.name}
            onDelete={onRemoveName}
            deleteIcon={<Iconify icon="eva:close-fill" />}
          />
        </Stack>
      )}

      {filters.status !== 'all' && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2">Trạng thái:</Typography>
          <Chip
            size="small"
            label={STATUS_LABELS[filters.status as keyof typeof STATUS_LABELS] || filters.status}
            onDelete={onRemoveStatus}
            deleteIcon={<Iconify icon="eva:close-fill" />}
          />
        </Stack>
      )}

      {filters.flag !== 'all' && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2">Flag:</Typography>
          <Chip
            size="small"
            label={FLAG_LABELS[filters.flag as keyof typeof FLAG_LABELS] || filters.flag}
            onDelete={onRemoveFlag}
            deleteIcon={<Iconify icon="eva:close-fill" />}
          />
        </Stack>
      )}

      {filters.brand !== 'all' && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2">Thương hiệu:</Typography>
          <Chip
            size="small"
            label={BRAND_LABELS[filters.brand as keyof typeof BRAND_LABELS] || filters.brand}
            onDelete={onRemoveBrand}
            deleteIcon={<Iconify icon="eva:close-fill" />}
          />
        </Stack>
      )}

      {filters.category !== 'all' && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2">Danh mục:</Typography>
          <Chip
            size="small"
            label={
              CATEGORY_LABELS[filters.category as keyof typeof CATEGORY_LABELS] || filters.category
            }
            onDelete={onRemoveCategory}
            deleteIcon={<Iconify icon="eva:close-fill" />}
          />
        </Stack>
      )}

      {filters.startDate && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2">Từ:</Typography>
          <Chip
            size="small"
            label={formatDate(filters.startDate)}
            onDelete={onRemoveStartDate}
            deleteIcon={<Iconify icon="eva:close-fill" />}
          />
        </Stack>
      )}

      {filters.endDate && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2">Đến:</Typography>
          <Chip
            size="small"
            label={formatDate(filters.endDate)}
            onDelete={onRemoveEndDate}
            deleteIcon={<Iconify icon="eva:close-fill" />}
          />
        </Stack>
      )}

      {isShowReset && (
        <Chip
          size="small"
          label="Xóa tất cả"
          onDelete={onResetAll}
          deleteIcon={<Iconify icon="eva:trash-2-outline" />}
          sx={{ ml: 1 }}
        />
      )}
    </Stack>
  );
}
