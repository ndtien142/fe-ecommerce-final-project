import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, Typography, Button } from '@mui/material';
// components
import Image from '../../common/components/Image';
import Iconify from '../../common/components/Iconify';
import { MotionViewport, varFade } from '../../common/components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    name: 'Phòng khách',
    description: 'Sofa, bàn trà, kệ TV và phụ kiện trang trí',
    icon: 'eva:home-outline',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/shop?category=phong-khach',
  },
  {
    name: 'Phòng ngủ',
    description: 'Giường, tủ quần áo, bàn trang điểm',
    icon: 'eva:bed-outline',
    image:
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/shop?category=phong-ngu',
  },
  {
    name: 'Phòng bếp',
    description: 'Bàn ăn, ghế ăn, tủ bếp hiện đại',
    icon: 'eva:grid-outline',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/shop?category=kitchen',
  },
  {
    name: 'Văn phòng',
    description: 'Bàn làm việc, ghế ergonomic, tủ sách',
    icon: 'eva:book-outline',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    link: '/shop?category=phong-lam-viec',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[100],
}));

const CardStyle = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.customShadows.z24,
  },
}));

// ----------------------------------------------------------------------

export default function HomeCategories() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Danh mục nội thất
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Khám phá các bộ sưu tập nội thất đa dạng cho mọi không gian trong ngôi nhà của bạn
            </Typography>
          </m.div>
        </Box>

        <Grid container spacing={4}>
          {CATEGORIES.map((category, index) => (
            <Grid key={category.name} item xs={12} sm={6} md={3}>
              <m.div variants={varFade().inUp}>
                <CardStyle onClick={() => (window.location.href = category.link)}>
                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      ratio="4/3"
                      sx={{ borderRadius: 1.5 }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        p: 1,
                        borderRadius: '50%',
                        boxShadow: 1,
                      }}
                    >
                      <Iconify
                        icon={category.icon}
                        width={24}
                        height={24}
                        sx={{ color: 'primary.main' }}
                      />
                    </Box>
                  </Box>

                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {category.name}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    {category.description}
                  </Typography>

                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    endIcon={<Iconify icon="eva:arrow-forward-fill" />}
                  >
                    Xem thêm
                  </Button>
                </CardStyle>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
