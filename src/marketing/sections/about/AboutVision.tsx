import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../../common/components/Image';
import { MotionViewport, varFade } from '../../../common/components/animate';

// ----------------------------------------------------------------------

const VISIONS = [
  {
    name: 'Tầm nhìn',
    description:
      'Trở thành thương hiệu nội thất hàng đầu Việt Nam, mang đến những sản phẩm chất lượng cao và dịch vụ tuyệt vời nhất cho khách hàng.',
  },
  {
    name: 'Sứ mệnh',
    description:
      'Tạo ra những không gian sống đẹp và tiện nghi, giúp mọi gia đình có được ngôi nhà trong mơ với chi phí hợp lý.',
  },
  {
    name: 'Giá trị cốt lõi',
    description:
      'Chất lượng - Sáng tạo - Tận tâm. Chúng tôi cam kết mang đến những sản phẩm tốt nhất và dịch vụ chăm sóc khách hàng tận tình.',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[900],
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 380,
  minHeight: 440,
  margin: 'auto',
  textAlign: 'center',
  padding: theme.spacing(10, 5, 0),
  boxShadow: theme.customShadows.z12,
  [theme.breakpoints.up('md')]: {
    boxShadow: 'none',
    backgroundColor: theme.palette.grey[800],
  },
}));

// ----------------------------------------------------------------------

export default function AboutVision() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.48
  )}`;

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            mb: 10,
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Peracta Furniture about"
              sx={{
                height: { xs: 280, xl: 320 },
                boxShadow: shadow,
                width: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                background: `linear-gradient(to bottom, ${alpha(theme.palette.grey[900], 0)} 0%, ${
                  theme.palette.grey[900]
                } 75%)`,
              }}
            />
          </Box>
          <Box
            sx={{
              bottom: { xs: 24, md: 40 },
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              position: 'absolute',
              justifyContent: 'center',
            }}
          >
            {VISIONS.map((vision) => (
              <m.div key={vision.name} variants={varFade().in}>
                <CardStyle>
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 5,
                      color: 'primary.main',
                    }}
                  >
                    {vision.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'common.white',
                    }}
                  >
                    {vision.description}
                  </Typography>
                </CardStyle>
              </m.div>
            ))}
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
}
