import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

type Props = {
  filterName: string;
  filterBrand: string;
  filterCategory: string;
  filterStatus: string;
  filterFlag: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  onFilterName: (value: string) => void;
  onFilterBrand: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterFlag: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
};

// Options for filters
const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Ngừng hoạt động' },
  { value: 'archived', label: 'Lưu trữ' },
];

const FLAG_OPTIONS = [
  { value: 'all', label: 'Tất cả flag' },
  { value: 'none', label: 'Không có' },
  { value: 'new', label: 'Mới' },
  { value: 'popular', label: 'Phổ biến' },
  { value: 'featured', label: 'Nổi bật' },
  { value: 'on_sale', label: 'Khuyến mãi' },
];

// Temporarily hidden options
/*
const BRAND_OPTIONS = [
  { value: 'all', label: 'Tất cả thương hiệu' },
  { value: 'IKEA', label: 'IKEA' },
  { value: 'Jysk', label: 'Jysk' },
  { value: 'Lotte', label: 'Lotte' },
  { value: 'Duy Tân', label: 'Duy Tân' },
  { value: 'Hòa Phát', label: 'Hòa Phát' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'Tất cả danh mục' },
  { value: 'ban-ghe', label: 'Bàn ghế' },
  { value: 'giuong-tu', label: 'Giường tủ' },
  { value: 'trang-tri', label: 'Trang trí' },
  { value: 'den-chieu-sang', label: 'Đèn chiếu sáng' },
  { value: 'phu-kien-nha-bep', label: 'Phụ kiện nhà bếp' },
];
*/

export default function ProductTableToolbar({
  filterName,
  filterBrand,
  filterCategory,
  filterStatus,
  filterFlag,
  filterStartDate,
  filterEndDate,
  onFilterName,
  onFilterBrand,
  onFilterCategory,
  onFilterStatus,
  onFilterFlag,
  onFilterStartDate,
  onFilterEndDate,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="Trạng thái"
        value={filterStatus}
        onChange={onFilterStatus}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
        }}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Flag"
        value={filterFlag}
        onChange={onFilterFlag}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
        }}
      >
        {FLAG_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Temporarily hidden filters */}
      {/* <TextField
        fullWidth
        select
        label="Thương hiệu"
        value={filterBrand}
        onChange={onFilterBrand}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
        }}
      >
        {BRAND_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Danh mục"
        value={filterCategory}
        onChange={onFilterCategory}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
        }}
      >
        {CATEGORY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <DatePicker
        label="Từ ngày"
        value={filterStartDate}
        onChange={onFilterStartDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />

      <DatePicker
        label="Đến ngày"
        value={filterEndDate}
        onChange={onFilterEndDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            sx={{
              maxWidth: { md: INPUT_WIDTH },
            }}
          />
        )}
      />
      */}

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Tìm kiếm tên sản phẩm, SKU..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
