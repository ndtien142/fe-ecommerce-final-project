import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Stack,
} from '@mui/material';
// components
import { MotionViewport, varFade } from '../../common/components/animate';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'Nguyễn Thị Lan',
    role: 'Khách hàng VIP',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b056b131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
    rating: 5,
    comment:
      'Sản phẩm chất lượng cao, giao hàng nhanh và đội ngũ nhân viên rất chuyên nghiệp. Tôi đã mua nhiều bộ nội thất và rất hài lòng!',
  },
  {
    name: 'Trần Văn Minh',
    role: 'Kiến trúc sư',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
    rating: 5,
    comment:
      'Peracta Furniture là lựa chọn hàng đầu của tôi khi tư vấn nội thất cho khách hàng. Thiết kế đẹp, chất lượng tuyệt vời!',
  },
  {
    name: 'Lê Thị Hương',
    role: 'Chủ nhà hàng',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 4,
    comment:
      'Đội ngũ tư vấn nhiệt tình, sản phẩm phù hợp với không gian nhà hàng. Dịch vụ sau bán hàng rất tốt, tôi sẽ tiếp tục ủng hộ!',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[100],
}));

const CardStyle = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.customShadows.z24,
  },
}));

// ----------------------------------------------------------------------

export default function HomeTestimonials() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Khách hàng nói gì về chúng tôi?
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Hàng nghìn khách hàng đã tin tưởng và lựa chọn Peracta Furniture cho không gian sống
              của họ
            </Typography>
          </m.div>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {TESTIMONIALS.map((testimonial, index) => (
            <m.div key={testimonial.name} variants={varFade().inUp}>
              <CardStyle>
                <CardContent>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                    }}
                  />

                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {testimonial.name}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {testimonial.role}
                  </Typography>

                  <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />

                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    "{testimonial.comment}"
                  </Typography>
                </CardContent>
              </CardStyle>
            </m.div>
          ))}
        </Stack>
      </Container>
    </RootStyle>
  );
}
