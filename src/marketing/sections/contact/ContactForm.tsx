import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../../common/components/animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Có thắc mắc về nội thất Peracta Furniture? <br />
          Chúng tôi sẵn sàng giúp bạn tìm được những món đồ hoàn hảo cho ngôi nhà.
        </Typography>
      </m.div>

      <Stack spacing={3}>
        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Họ và tên" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Email" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Số điện thoại" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Tiêu đề" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Hãy chia sẻ nhu cầu nội thất của bạn..." multiline rows={4} />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Gửi yêu cầu
        </Button>
      </m.div>
    </Stack>
  );
}
