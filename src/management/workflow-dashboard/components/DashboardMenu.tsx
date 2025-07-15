import React from 'react';
// @mui
import { Menu, MenuItem, Divider, CircularProgress } from '@mui/material';
// components
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

interface DashboardMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onClearCache?: () => void;
  isClearingCache?: boolean;
}

export default function DashboardMenu({
  anchorEl,
  open,
  onClose,
  onClearCache,
  isClearingCache,
}: DashboardMenuProps) {
  const handleClearCache = () => {
    onClearCache?.();
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onClose}>
        <Iconify icon={'eva:download-fill'} sx={{ mr: 2 }} />
        Xuất báo cáo
      </MenuItem>
      <MenuItem onClick={handleClearCache} disabled={isClearingCache}>
        {isClearingCache ? (
          <CircularProgress size={16} sx={{ mr: 2 }} />
        ) : (
          <Iconify icon={'eva:refresh-fill'} sx={{ mr: 2 }} />
        )}
        {isClearingCache ? 'Đang xóa cache...' : 'Xóa cache'}
      </MenuItem>
      <MenuItem onClick={onClose}>
        <Iconify icon={'eva:settings-2-fill'} sx={{ mr: 2 }} />
        Cài đặt
      </MenuItem>
      <Divider />
      <MenuItem onClick={onClose}>
        <Iconify icon={'eva:info-fill'} sx={{ mr: 2 }} />
        Thông tin
      </MenuItem>
    </Menu>
  );
}
