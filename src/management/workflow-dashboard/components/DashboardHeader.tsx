import React from 'react';
// @mui
import { Stack, Typography, Button, IconButton, CircularProgress } from '@mui/material';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

interface DashboardHeaderProps {
  onRefresh: () => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  isRefreshing?: boolean;
}

export default function DashboardHeader({
  onRefresh,
  onMenuOpen,
  isRefreshing,
}: DashboardHeaderProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
      <Typography variant="h4">Dashboard Workflow</Typography>
      <Stack direction="row" spacing={1}>
        <Button
          color="inherit"
          startIcon={
            isRefreshing ? <CircularProgress size={16} /> : <Iconify icon={'eva:refresh-fill'} />
          }
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Đang làm mới...' : 'Làm mới'}
        </Button>
        <IconButton onClick={onMenuOpen}>
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
      </Stack>
    </Stack>
  );
}
