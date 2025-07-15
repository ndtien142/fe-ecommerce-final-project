import { useState } from 'react';
// @mui
import { Button, MenuItem, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../common/redux/store';
import { sortByProducts } from '../../common/redux/slices/product';
// components
import Iconify from '../../common/components/Iconify';
import MenuPopover from '../../common/components/MenuPopover';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'create_time', label: 'Mới nhất' },
  { value: 'name', label: 'Tên A-Z' },
  { value: 'name_desc', label: 'Tên Z-A' },
  { value: 'price', label: 'Giá: Thấp-Cao' },
  { value: 'price_desc', label: 'Giá: Cao-Thấp' },
  { value: 'price_sale', label: 'Giá sale: Thấp-Cao' },
  { value: 'price_sale_desc', label: 'Giá sale: Cao-Thấp' },
  { value: 'sold', label: 'Bán chạy nhất' },
  { value: 'stock', label: 'Còn hàng nhiều' },
  { value: 'stock_desc', label: 'Còn hàng ít' },
];

function renderLabel(label: string | null) {
  const option = SORT_BY_OPTIONS.find((opt) => opt.value === label);
  return option ? option.label : 'Mới nhất';
}

// ----------------------------------------------------------------------

export default function ShopProductSort() {
  const dispatch = useDispatch();

  const { sortBy } = useSelector((state) => state.product);

  const [open, setOpen] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (currentTarget: HTMLButtonElement) => {
    setOpen(currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSortBy = (value: string) => {
    handleClose();
    dispatch(sortByProducts(value));
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={(event) => handleOpen(event.currentTarget)}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
        sx={{
          fontSize: '0.875rem',
          fontWeight: 500,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        Sắp xếp:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {renderLabel(sortBy)}
        </Typography>
      </Button>

      <MenuPopover
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        sx={{
          width: 'auto',
          '& .MuiMenuItem-root': { typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortBy}
            onClick={() => handleSortBy(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
