import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending_confirmation', label: 'Chờ xác nhận' },
  { value: 'pending_pickup', label: 'Chờ lấy hàng' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'delivered', label: 'Đã giao' },
  { value: 'returned', label: 'Trả hàng' },
  { value: 'cancelled', label: 'Đã hủy' },
];

type Props = {
  filterStatus: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  filterName: string;
  onFilterStatus: (event: React.SyntheticEvent, value: string) => void;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
  onFilterName: (value: string) => void;
};

export default function OrderTableToolbar({
  filterStatus,
  filterStartDate,
  filterEndDate,
  filterName,
  onFilterStatus,
  onFilterStartDate,
  onFilterEndDate,
  onFilterName,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
      {/* Status filter moved to Tabs, so not needed here */}
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

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Tìm kiếm mã đơn hoặc tên khách hàng..."
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
