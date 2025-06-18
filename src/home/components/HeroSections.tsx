import { Box, Button, Container, Typography } from '@mui/material';
import useSettings from 'src/common/hooks/useSettings';

export default function HeroSection() {
  const { themeStretch } = useSettings();
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 320, md: 480 },
        backgroundImage:
          'url(https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        mb: 6,
      }}
    >
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.85)',
            p: { xs: 3, md: 6 },
            borderRadius: 2,
            maxWidth: 540,
            boxShadow: 3,
            mt: { xs: 4, md: 6 },
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Khám phá nội thất hiện đại cho không gian sống của bạn
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Mang đến sự tinh tế, tiện nghi và phong cách cho ngôi nhà của bạn với bộ sưu tập nội
            thất cao cấp.
          </Typography>
          <Button variant="contained" color="primary" size="large" href="shop" sx={{ mt: 2 }}>
            Mua ngay
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
