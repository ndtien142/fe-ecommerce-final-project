import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  optionsStatus: string[];  // Danh sách trạng thái (active, inactive, all)
  filterName: string;       // Tên lọc phòng ban
  filterStatus: string;     // Trạng thái lọc phòng ban
  onFilterName: (value: string) => void;  // Hàm lọc tên phòng ban
  onFilterStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;  // Hàm lọc trạng thái phòng ban
};

export default function DepartmentTableToolbar({
  filterName,
  filterStatus,
  onFilterName,
  onFilterStatus,
  optionsStatus,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      {/* TextField lọc theo tên phòng ban */}
      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Search department..."
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

      {/* TextField lọc theo trạng thái phòng ban */}
      <TextField
        fullWidth
        select
        label="Status"
        value={filterStatus}
        onChange={onFilterStatus}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsStatus.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
