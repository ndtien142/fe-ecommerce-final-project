import React from 'react';
// Mui
import {
  Button,
  Container,
  Table,
  TableContainer,
  TableBody,
  Card,
  Box,
  TablePagination,
  Switch,
  FormControlLabel,
} from '@mui/material';
// Components
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Page from 'src/common/components/Page';
import Iconify from 'src/common/components/Iconify';
import Scrollbar from 'src/common/components/Scrollbar';
// Hooks
import useSettings from 'src/common/hooks/useSettings';
import useTable, { emptyRows } from 'src/common/hooks/useTable';
// Router
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { paramCase } from 'change-case';
import { useGetListCoupon } from '../common/hooks/useGetListCoupon';
import { ICoupon } from 'src/common/@types/coupon/coupon.interface';
import useMessage from 'src/common/hooks/useMessage';
import { TableEmptyRows, TableHeadCustom, TableNoData } from 'src/common/components/table';
import { TABLE_COUPON_HEAD } from '../common/constant';
import CouponTableRow from '../common/components/list/CouponTableRow';

const ListCouponContainer = () => {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
    //
    selected,
    onSelectRow,
  } = useTable();

  const { data } = useGetListCoupon({
    page: page + 1,
    limit: rowsPerPage,
  });

  const handleDeleteRow = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa coupon này không?')) {
      try {
        console.log('Delete coupon:', id);
        showSuccessSnackbar('Xóa coupon thành công');
      } catch (error: any) {
        showErrorSnackbar('Đã xảy ra lỗi khi xóa coupon');
      }
    }
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.coupon.edit(paramCase(id)));
  };

  const dataFiltered = data?.metadata?.items || [];

  const isNotFound = !dataFiltered.length;

  return (
    <Page title="Danh sách coupon">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách coupon"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Coupon', href: PATH_DASHBOARD.coupon.root },
            { name: 'Danh sách' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.coupon.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Tạo coupon mới
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_COUPON_HEAD}
                  rowCount={dataFiltered.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered.map((row: ICoupon) => (
                    <CouponTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id.toString())}
                      onSelectRow={() => onSelectRow(row.id.toString())}
                      onDeleteRow={() => handleDeleteRow(row.id.toString())}
                      onEditRow={() => handleEditRow(row.id.toString())}
                    />
                  ))}

                  <TableEmptyRows
                    height={dense ? 52 : 72}
                    emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data?.metadata?.meta?.totalItems || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
};

export default ListCouponContainer;
