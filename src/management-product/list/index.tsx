import React, { useState } from 'react';
// Mui
import {
  Button,
  Container,
  Table,
  TableContainer,
  Tooltip,
  IconButton,
  TableBody,
  Card,
  Box,
  TablePagination,
  Switch,
  FormControlLabel,
  Divider,
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
import { PATH_CUSTOMER, PATH_DASHBOARD } from 'src/common/routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// API hook for products
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import ProductTableRow from '../common/list/ProductTableRow';
import ProductTableToolbar from '../common/list/ProductTableToolbar';
import ProductTagFiltered from '../common/list/ProductTagFiltered';
import { useGetListProduct } from '../common/hooks/useGetListProduct';

// Table head config (match with ProductTableRow columns)
const TABLE_PRODUCT_HEAD = [
  { id: 'name', label: 'Tên sản phẩm' },
  { id: 'brand', label: 'Thương hiệu' },
  { id: 'categories', label: 'Danh mục' },
  { id: 'createTime', label: 'Ngày tạo' },
  { id: 'inventoryType', label: 'Tồn kho', align: 'center' },
  { id: 'price', label: 'Giá', align: 'right' },
  { id: 'stock', label: 'SL', align: 'right' },
  { id: 'sold', label: 'Đã bán', align: 'right' },
  { id: 'status', label: 'Trạng thái', align: 'right' },
  { id: '' },
];
// Table row component (implement as needed)

const ListProductContainer = () => {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  // Filter states
  const [filterName, setFilterName] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFlag, setFilterFlag] = useState('all');
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);

  const denseHeight = dense ? 52 : 72;

  // Build API filters
  const apiFilters = {
    limit: rowsPerPage,
    page: page + 1,
    search: filterName || undefined,
    status:
      filterStatus !== 'all' ? (filterStatus as 'active' | 'inactive' | 'archived') : undefined,
    flag:
      filterFlag !== 'all'
        ? (filterFlag as 'none' | 'new' | 'popular' | 'featured' | 'on_sale')
        : undefined,
    brandName: filterBrand !== 'all' ? filterBrand : undefined,
    categorySlug: filterCategory !== 'all' ? filterCategory : undefined,
    startDate: filterStartDate ? filterStartDate.toISOString() : undefined,
    endDate: filterEndDate ? filterEndDate.toISOString() : undefined,
  };

  const { data, isLoading } = useGetListProduct(apiFilters);

  const products = data?.metadata?.items || [];

  // Filter handlers
  const handleFilterName = (value: string) => {
    setFilterName(value);
    setPage(0);
  };

  const handleFilterBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBrand(event.target.value);
    setPage(0);
  };

  const handleFilterCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCategory(event.target.value);
    setPage(0);
  };

  const handleFilterStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(event.target.value);
    setPage(0);
  };

  const handleFilterFlag = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterFlag(event.target.value);
    setPage(0);
  };

  const handleFilterStartDate = (date: Date | null) => {
    setFilterStartDate(date);
    setPage(0);
  };

  const handleFilterEndDate = (date: Date | null) => {
    setFilterEndDate(date);
    setPage(0);
  };

  const handleDeleteRows = (selected: string[]) => {
    // Implement delete logic here
    setSelected([]);
  };

  const handleViewRow = (slug: string) => {
    window.open(PATH_CUSTOMER.eCommerce.view(slug), '_blank');
  };

  const handleEditRow = (slug: string) => {
    navigate(PATH_DASHBOARD.product.edit(slug));
  };

  const isNotFound = !products.length && !!filterName;

  return (
    <Page title="Quản lý: Danh sách sản phẩm">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách sản phẩm"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Sản phẩm', href: PATH_DASHBOARD.product.root },
            { name: 'Danh sách' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.product.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Thêm mới sản phẩm
            </Button>
          }
        />
        <Card>
          <ProductTableToolbar
            filterName={filterName}
            filterBrand={filterBrand}
            filterCategory={filterCategory}
            filterStatus={filterStatus}
            filterFlag={filterFlag}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            onFilterBrand={handleFilterBrand}
            onFilterCategory={handleFilterCategory}
            onFilterStatus={handleFilterStatus}
            onFilterFlag={handleFilterFlag}
            onFilterStartDate={handleFilterStartDate}
            onFilterEndDate={handleFilterEndDate}
          />

          <Divider />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={products.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      products.map((row) => String(row.id))
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_PRODUCT_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      products.map((row) => String(row.id))
                    )
                  }
                />

                <TableBody>
                  {isLoading ? (
                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, products.length)}
                    />
                  ) : (
                    products.map((row) => (
                      <ProductTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(String(row.id))}
                        onSelectRow={() => onSelectRow(String(row.id))}
                        onViewRow={() => handleViewRow(row.slug)}
                        onEditRow={() => handleEditRow(row.slug)}
                      />
                    ))
                  )}
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

export default ListProductContainer;
