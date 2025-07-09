import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
// components
import Image from '../../common/components/Image';
import { MotionViewport, varFade } from '../../common/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    margin: 'unset',
  },
}));

// ----------------------------------------------------------------------

export default function HomeAbout() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={5}
          alignItems="center"
          justifyContent="space-between"
        >
          <ContentStyle>
            <m.div variants={varFade().inUp}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                15 năm kinh nghiệm trong ngành nội thất
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.8 }}>
                FPT Furniture đã đồng hành cùng hàng nghìn gia đình Việt Nam tạo nên không gian sống
                lý tưởng. Chúng tôi tự hào là một trong những thương hiệu nội thất uy tín hàng đầu.
              </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Stack direction="row" spacing={5} sx={{ mb: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    50K+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Khách hàng hài lòng
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    500+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Sản phẩm nội thất
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    15+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Năm kinh nghiệm
                  </Typography>
                </Box>
              </Stack>
            </m.div>

            <m.div variants={varFade().inUp}>
              <Button
                variant="contained"
                size="large"
                href="/about-us"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                Tìm hiểu thêm về chúng tôi
              </Button>
            </m.div>
          </ContentStyle>

          <Box sx={{ position: 'relative' }}>
            <m.div variants={varFade().inRight}>
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1158&q=80"
                alt="FPT Furniture showroom"
                sx={{
                  width: { xs: 300, md: 400 },
                  height: { xs: 200, md: 300 },
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </m.div>
          </Box>
        </Stack>
      </Container>
    </RootStyle>
  );
}
