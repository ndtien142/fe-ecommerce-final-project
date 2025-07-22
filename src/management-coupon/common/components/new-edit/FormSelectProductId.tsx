import {
  Card,
  Divider,
  FormControlLabel,
  Switch,
  TableBody,
  TableContainer,
  TablePagination,
  Table,
  Box,
  Modal,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import useSettings from 'src/common/hooks/useSettings';
import useTable, { emptyRows } from 'src/common/hooks/useTable';
import { useGetListProduct } from 'src/management-product/common/hooks/useGetListProduct';
import ProductTableToolbar from 'src/management-product/common/list/ProductTableToolbar';
import ProductTableRow from './ProductTableRow';

interface FormSelectProductIdProps {
  open: boolean;
  defaultSelected?: string[];
  onClose: () => void;
  onSelect: (productId: string[]) => void;
}

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

const FormSelectProductId = ({
  open,
  onClose,
  onSelect,
  defaultSelected,
}: FormSelectProductIdProps) => {
  const { themeStretch } = useSettings();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected = [],
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultSelected,
  });

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

  const handleSelect = () => {
    onSelect(selected);
    onClose();
  };

  const isNotFound = !products.length && !!filterName;
  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          p: 3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: themeStretch ? '100%' : { xs: 1, sm: 720, md: 960, lg: 1140 },
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6">Chọn sản phẩm</Typography>
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
          <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleSelect}>
              Chọn sản phẩm
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Modal>
  );
};

export default FormSelectProductId;
