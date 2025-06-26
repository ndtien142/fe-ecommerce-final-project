import React, { useState } from 'react';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, Stack, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fCurrency } from 'src/common/utils/formatNumber';
import { fDate } from 'src/common/utils/formatTime';
import Label from 'src/common/components/Label';
import Image from 'src/common/components/Image';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { IProductApiResponse } from 'src/common/@types/product/product.interface';

type Props = {
  row: IProductApiResponse;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

const ProductTableRow = ({ row, selected, onSelectRow, onDeleteRow, onEditRow }: Props) => {
  const theme = useTheme();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  // Use thumbnail or first image as cover
  const cover =
    row.thumbnail ||
    (Array.isArray(row.images) && row.images.length > 0 && row.images[0].imageUrl) ||
    '';

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          disabledEffect
          alt={row.name}
          src={cover}
          sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
        />
        <Typography variant="subtitle2" noWrap>
          {row.name}
        </Typography>
      </TableCell>

      <TableCell>{row.brand?.name}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={1}>
          {row.categories?.map((cat) => (
            <Chip key={cat.id} label={cat.name} size="small" />
          ))}
        </Stack>
      </TableCell>
      <TableCell>{fDate(row.createTime)}</TableCell>
      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (row.inventoryType === 'out_of_stock' && 'error') ||
            (row.inventoryType === 'low_stock' && 'warning') ||
            'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {row.inventoryType}
        </Label>
      </TableCell>
      <TableCell align="right">{fCurrency(row.price)}</TableCell>
      <TableCell align="right">{row.stock}</TableCell>
      <TableCell align="right">{row.sold}</TableCell>
      <TableCell align="right">
        <Label
          variant="filled"
          color={
            row.status === 'active'
              ? 'success'
              : row.status === 'inactive'
              ? 'warning'
              : row.status === 'archived'
              ? 'default'
              : 'info'
          }
        >
          {row.status}
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
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xóa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Sửa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
