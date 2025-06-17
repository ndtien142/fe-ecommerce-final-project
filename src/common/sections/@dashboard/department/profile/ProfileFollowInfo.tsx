// @mui
import { Card, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// @types
import { IDepartment } from '../../../../@types/department/department.interface';

// ----------------------------------------------------------------------

type Props = {
  department: IDepartment;
};

export default function DepartmentFollowInfo({ department }: Props) {
  // Thông tin cần hiển thị cho phòng ban, ví dụ như số lượng nhân viên, dự án
  const { departmentName, isActive, createdAt, updatedAt } = department;

  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(0)}</Typography> {/* Placeholder: Số lượng nhân viên */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Nhân viên
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(0)}</Typography> {/* Placeholder: Số dự án */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Dự án
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ mt: 2 }}>
        <Typography variant="h6">Thông tin phòng ban</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Tên phòng ban: {departmentName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Trạng thái: {isActive ? 'Hoạt động' : 'Không hoạt động'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Ngày tạo: {createdAt}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Cập nhật lần cuối: {updatedAt}
        </Typography>
      </Stack>
    </Card>
  );
}
