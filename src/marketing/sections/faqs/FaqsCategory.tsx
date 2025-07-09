import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Grid, Card, Container, Typography } from '@mui/material';
// components
import Iconify from '../../../common/components/Iconify';
import { MotionViewport, varFade } from '../../../common/components/animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    icon: 'eva:home-outline',
    name: 'Phòng khách',
    description: 'Sofa, bàn trà, kệ TV',
  },
  {
    icon: 'eva:bed-outline',
    name: 'Phòng ngủ',
    description: 'Giường, tủ quần áo, bàn trang điểm',
  },
  {
    icon: 'eva:grid-outline',
    name: 'Phòng bếp',
    description: 'Bàn ăn, ghế ăn, tủ bếp',
  },
  {
    icon: 'eva:book-outline',
    name: 'Phòng làm việc',
    description: 'Bàn làm việc, ghế văn phòng, tủ sách',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.grey[500], 0.04),
}));

const CardStyle = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  padding: theme.spacing(5, 3),
  [theme.breakpoints.up('md')]: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
}));

// ----------------------------------------------------------------------

export default function FaqsCategory() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
          {CATEGORIES.map((category, index) => (
            <Grid key={category.name} item xs={12} md={3}>
              <m.div variants={varFade().inUp}>
                <CardStyle>
                  <Box
                    component={Iconify}
                    icon={category.icon}
                    sx={{
                      mb: 2,
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      color: 'primary.main',
                    }}
                  />
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {category.description}
                  </Typography>
                </CardStyle>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
