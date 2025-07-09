import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography, LinearProgress } from '@mui/material';
// hooks
import useResponsive from '../../../common/hooks/useResponsive';
// utils
import { fPercent } from '../../../common/utils/formatNumber';
// components
import Image from '../../../common/components/Image';
import Iconify from '../../../common/components/Iconify';
import { MotionViewport, varFade } from '../../../common/components/animate';

// ----------------------------------------------------------------------

const SKILLS = [
  { label: 'Chất lượng sản phẩm', value: 95 },
  { label: 'Dịch vụ khách hàng', value: 98 },
  { label: 'Thiết kế sáng tạo', value: 92 },
];

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function AboutWhat() {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.48
  )}`;

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
          {isDesktop && (
            <Grid item xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <Image
                      alt="FPT Furniture showroom"
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      ratio="3/4"
                      sx={{
                        borderRadius: 2,
                        boxShadow: shadow,
                      }}
                    />
                  </m.div>
                </Grid>
                <Grid item xs={6}>
                  <m.div variants={varFade().inUp}>
                    <Image
                      alt="FPT Furniture products"
                      src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80"
                      ratio="1/1"
                      sx={{ borderRadius: 2 }}
                    />
                  </m.div>
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={5}>
            <m.div variants={varFade().inRight}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Nội thất chất lượng cho mọi gia đình
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'text.secondary' : 'common.white',
                }}
              >
                FPT Furniture chuyên tạo ra những sản phẩm nội thất đẹp và tiện dụng, biến ngôi nhà
                thành không gian sống lý tưởng. Với hơn 15 năm kinh nghiệm, chúng tôi đã giúp hàng
                nghìn khách hàng tìm được những món đồ hoàn hảo cho không gian sống. Từ thiết kế
                hiện đại tối giản đến phong cách cổ điển truyền thống, bộ sưu tập đa dạng của chúng
                tôi phù hợp với mọi sở thích và ngân sách.
              </Typography>
            </m.div>

            <Box sx={{ my: 5 }}>
              {SKILLS.map((progress) => (
                <m.div key={progress.label} variants={varFade().inRight}>
                  <ProgressItem progress={progress} />
                </m.div>
              ))}
            </Box>

            <m.div variants={varFade().inRight}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
              >
                Tìm hiểu thêm
              </Button>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

function ProgressItem({ progress }: { progress: { label: string; value: number } }) {
  const { label, value } = progress;

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2">{label}&nbsp;</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ({fPercent(value)})
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          '& .MuiLinearProgress-bar': { bgcolor: 'grey.700' },
          '&.MuiLinearProgress-root': { bgcolor: 'common.white' },
        }}
      />
    </Box>
  );
}
