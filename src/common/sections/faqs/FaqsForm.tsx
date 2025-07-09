import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
//
import { varFade, MotionViewport } from '../../components/animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack component={MotionViewport} spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h4">Still have questions about our furniture?</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Name" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Email" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Subject" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField
          fullWidth
          label="Ask us about furniture, delivery, or customization..."
          multiline
          rows={4}
        />
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Submit Now
        </Button>
      </m.div>
    </Stack>
  );
}
