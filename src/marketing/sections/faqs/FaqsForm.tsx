import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
//
import { varFade, MotionViewport } from '../../../common/components/animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack component={MotionViewport} spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h4">Vẫn còn thắc mắc về nội thất Mini?</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Họ và tên" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Email" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Tiêu đề" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField
          fullWidth
          label="Hỏi chúng tôi về nội thất, giao hàng, hoặc tùy chỉnh..."
          multiline
          rows={4}
        />
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Gửi câu hỏi
        </Button>
      </m.div>
    </Stack>
  );
}
