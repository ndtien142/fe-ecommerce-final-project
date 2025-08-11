import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../../common/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

export default function ContactMap({ contacts }: { contacts: any[] }) {
  return (
    <RootStyle>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ mb: 3 }}>
          Địa chỉ các showroom Peracta Furniture
        </Typography>
      </m.div>

      <Box component={MotionViewport} sx={{ height: 400, position: 'relative' }}>
        <m.div variants={varFade().inUp}>
          <Paper
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Bản đồ showroom
              </Typography>
              <Typography variant="body1">
                Ghé thăm showroom Peracta Furniture gần nhất để trải nghiệm trực tiếp
                <br />
                các sản phẩm nội thất chất lượng cao
              </Typography>
            </Box>
          </Paper>
        </m.div>
      </Box>

      <m.div variants={varFade().inUp}>
        <Typography variant="body1" sx={{ mt: 3, textAlign: 'center' }}>
          Liên hệ hotline: <strong>1800-1234</strong> để được hỗ trợ tư vấn miễn phí
        </Typography>
      </m.div>
    </RootStyle>
  );
}
