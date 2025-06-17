import { Grid, Stack } from '@mui/material';
// @types
import { IDepartment } from '../../../../@types/department/department.interface';  // Import đúng kiểu IDepartment
import DepartmentFollowInfo from './ProfileFollowInfo';
import { UserPost } from 'src/common/@types/user';


// ----------------------------------------------------------------------

type Props = {
  department: IDepartment;  // Thay vì myProfile, sử dụng department
  posts: UserPost[];  // Vẫn có thể dùng bài đăng cho phòng ban nếu có
};

export default function DepartmentProfile({ department, posts }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <DepartmentFollowInfo department={department} />  {/* Cập nhật thông tin phòng ban */}
        </Stack>
      </Grid>
    </Grid>
  );
}
