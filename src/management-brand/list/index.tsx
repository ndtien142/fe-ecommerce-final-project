import React from 'react';
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
import { useGetListBrand } from '../common/hooks/useGetListBrand';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import { TABLE_BRAND_HEAD } from '../common/constant';
import BrandTableRow from '../common/components/list/BrandTableRow';
import { paramCase } from 'change-case';

const ListBrandContainer = () => {
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

  const denseHeight = dense ? 52 : 72;

  const { data, isLoading } = useGetListBrand({
    limit: rowsPerPage,
    page: page + 1,
  });

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = data?.metadata?.items?.filter((row) => !selected.includes(String(row.id)));
    setSelected([]);
    // setTableData(deleteRows);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.brand.edit(paramCase(id)));
  };

  return (
    <Page title="Quản lý: Danh sách thương hiệu">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách thương hiệu"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Thương hiệu', href: PATH_DASHBOARD.brand.root },
            { name: 'Danh sách' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.brand.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Thêm mới thương hiệu
            </Button>
          }
        />
        <Card sx={{ p: 3 }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={data?.metadata?.items?.length || 0}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      data?.metadata?.items?.map((row) => String(row.id)) ?? []
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
                  headLabel={TABLE_BRAND_HEAD}
                  rowCount={data?.metadata?.items?.length || 0}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      data?.metadata?.items?.map((row) => String(row.id)) ?? []
                    )
                  }
                />

                <TableBody>
                  {data?.metadata?.items?.map((row) => (
                    <BrandTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(String(row.id))}
                      onSelectRow={() => onSelectRow(String(row.id))}
                      onDeleteRow={() => {}}
                      onEditRow={() => handleEditRow(String(row.name))}
                    />
                  ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, data?.metadata?.items?.length || 0)}
                  />

                  <TableNoData isNotFound={data?.metadata?.items?.length === 0 || isLoading} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data?.metadata?.items?.length || 0}
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

export default ListBrandContainer;
