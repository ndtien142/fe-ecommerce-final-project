import { useState } from 'react';
// @mui
import { Box, Grid, Card, Button, Typography, Stack } from '@mui/material';
import AccountBillingAddressBook from './AccountBillingAddressBook';

// ----------------------------------------------------------------------

export default function AccountBilling() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <AccountBillingAddressBook />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        {/* <AccountBillingInvoiceHistory invoices={invoices} /> */}
      </Grid>
    </Grid>
  );
}
