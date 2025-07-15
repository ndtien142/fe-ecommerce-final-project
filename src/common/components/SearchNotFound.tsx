import { Paper, PaperProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  searchQuery?: string;
}

export default function SearchNotFound({ searchQuery = '', ...other }: Props) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Không tìm thấy
      </Typography>
      <Typography variant="body2" align="center">
        Không tìm thấy kết quả cho &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Hãy thử kiểm tra lỗi chính tả hoặc sử dụng từ
        khóa khác.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2">Vui lòng nhập từ khóa tìm kiếm</Typography>
  );
}
