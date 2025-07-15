import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Stack } from '@mui/material';
// components
import Iconify from '../../common/components/Iconify';
import { MotionViewport, varFade } from '../../common/components/animate';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    icon: 'eva:award-outline',
    title: 'Chất lượng cao',
    description:
      'Sản phẩm được chọn lọc kỹ càng từ các nhà cung cấp uy tín, đảm bảo độ bền và thẩm mỹ.',
  },
  {
    icon: 'eva:shield-checkmark-outline',
    title: 'Bảo hành dài hạn',
    description: 'Cam kết bảo hành lên đến 5 năm cho các sản phẩm nội thất chính.',
  },
  {
    icon: 'eva:car-outline',
    title: 'Giao hàng miễn phí',
    description: 'Miễn phí vận chuyển và lắp đặt trong nội thành cho đơn hàng từ 5 triệu VNĐ.',
  },
  {
    icon: 'eva:people-outline',
    title: 'Tư vấn chuyên nghiệp',
    description: 'Đội ngũ thiết kế nội thất chuyên nghiệp hỗ trợ tư vấn 24/7.',
  },
  {
    icon: 'eva:refresh-outline',
    title: 'Đổi trả dễ dàng',
    description: 'Chính sách đổi trả trong 30 ngày, hoàn tiền 100% nếu không hài lòng.',
  },
  {
    icon: 'eva:credit-card-outline',
    title: 'Thanh toán linh hoạt',
    description: 'Hỗ trợ trả góp 0% lãi suất, thanh toán online an toàn, tiện lợi.',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.default,
}));

const FeatureStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-4px)',
  },
}));

// ----------------------------------------------------------------------

export default function HomeFeatures() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Tại sao chọn Mini Furniture?
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Chúng tôi cam kết mang đến trải nghiệm mua sắm nội thất tuyệt vời nhất cho khách hàng
            </Typography>
          </m.div>
        </Box>

        <Grid container spacing={4}>
          {FEATURES.map((feature, index) => (
            <Grid key={feature.title} item xs={12} sm={6} md={4}>
              <m.div variants={varFade().inUp}>
                <FeatureStyle>
                  <Box
                    sx={{
                      mb: 3,
                      mx: 'auto',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                    }}
                  >
                    <Iconify icon={feature.icon} width={40} height={40} />
                  </Box>

                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </FeatureStyle>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
