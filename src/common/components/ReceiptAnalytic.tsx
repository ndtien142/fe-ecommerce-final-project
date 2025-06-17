import { Stack, Typography, Box, CircularProgress } from '@mui/material';
import Iconify from 'src/common/components/Iconify';
import { fShortenNumber } from 'src/common/utils/formatNumber';

type Props = {
  icon: string;
  status: string;
  count: number;
  color?: string;
  total?: number; // total receipts for percent calculation
};

export default function ReceiptAnalytic({ icon, status, count, color, total }: Props) {
  const percent = total && total > 0 ? (count / total) * 100 : 0;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: 1, minWidth: 140 }} // decreased minWidth
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Iconify icon={icon} sx={{ color, width: 18, height: 18, position: 'absolute' }} />{' '}
        {/* smaller icon */}
        <CircularProgress
          variant="determinate"
          value={percent}
          size={38} // smaller progress
          thickness={3}
          sx={{ color, opacity: 0.48 }}
        />
        <CircularProgress
          variant="determinate"
          value={100}
          size={38}
          thickness={3}
          sx={{ color: 'grey.50016', position: 'absolute', top: 0, left: 0, opacity: 0.48 }}
        />
      </Stack>

      <Stack spacing={0.25} sx={{ ml: 1.2 }}>
        {' '}
        {/* less spacing and margin */}
        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
          {status}
        </Typography>
        <Typography variant="body2">
          {fShortenNumber(count)}{' '}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'caption' }}>
            phiếu
          </Box>
        </Typography>
      </Stack>
    </Stack>
  );
}
