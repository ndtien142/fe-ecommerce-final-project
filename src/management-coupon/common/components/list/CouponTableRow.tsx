import { Checkbox, TableCell, Typography, MenuItem, TableRow, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { ICoupon } from 'src/common/@types/coupon/coupon.interface';
import Iconify from 'src/common/components/Iconify';
import Label from 'src/common/components/Label';
import { TableMoreMenu } from 'src/common/components/table';
import { fCurrency } from 'src/common/utils/formatNumber';
import { fDate } from 'src/common/utils/formatTime';

type Props = {
  row: ICoupon;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onToggleStatus: VoidFunction;
};

const CouponTableRow = ({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onToggleStatus,
}: Props) => {
  const theme = useTheme();

  const { code, name, type, value, minOrderAmount, usageLimit, startDate, endDate, isActive } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const renderTypeChip = () => {
    const typeConfig = {
      percent: { label: 'Phần trăm', color: 'info' as const },
      fixed: { label: 'Số tiền', color: 'success' as const },
      free_shipping: { label: 'Free ship', color: 'warning' as const },
    };

    const config = typeConfig[type];
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  const renderValue = () => {
    if (type === 'percent') {
      return `${value}%`;
    } else if (type === 'fixed') {
      return fCurrency(value);
    } else {
      return 'Miễn phí';
    }
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {code}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="center">{renderTypeChip()}</TableCell>

      <TableCell align="center">
        <Typography variant="body2">{renderValue()}</Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2">{minOrderAmount ? fCurrency(minOrderAmount) : '-'}</Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2">{usageLimit || 'Không giới hạn'}</Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2">{fDate(startDate)}</Typography>
      </TableCell>

      <TableCell align="center">
        <Typography variant="body2">{fDate(endDate)}</Typography>
      </TableCell>

      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(isActive && 'success') || 'error'}
        >
          {isActive ? 'Hoạt động' : 'Tạm dừng'}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Chỉnh sửa
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onToggleStatus();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={isActive ? 'eva:eye-off-fill' : 'eva:eye-fill'} />
                {isActive ? 'Tắt' : 'Bật'}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xóa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default CouponTableRow;
