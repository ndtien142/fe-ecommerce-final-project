import { Avatar, Checkbox, TableCell, TableRow, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ICategory } from 'src/common/@types/product/category.interface';
import Iconify from 'src/common/components/Iconify';
import Label from 'src/common/components/Label';
import { TableMoreMenu } from 'src/common/components/table';
import { useTheme } from '@mui/material/styles';

type Props = {
  row: ICategory;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

const CategoryTableRow = ({ row, selected, onEditRow, onSelectRow, onDeleteRow }: Props) => {
  const theme = useTheme();

  const { id, name, slug, parent, imageUrl, status } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell>{id}</TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src={imageUrl || undefined} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {slug}
      </TableCell>

      <TableCell align="left">{parent?.name ?? ''}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={status === 'inactive' ? 'error' : 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {/* <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xoá
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Chỉnh sửa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default CategoryTableRow;
