import React, { useState } from 'react';
import {
  Button,
  Container,
  Card,
  TableContainer,
  Table,
  TableBody,
  Box,
  Switch,
  TablePagination,
  FormControlLabel,
  CircularProgress,
  Typography,
  Stack,
} from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Page from 'src/common/components/Page';
import Iconify from 'src/common/components/Iconify';
import useSettings from 'src/common/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData } from 'src/common/components/table';
import useTable, { emptyRows, getComparator } from 'src/common/hooks/useTable';
import { useGetAllRole } from '../../../../common/hooks/useGetAllRole';
import { IRole } from '../../../../common/@types/user/role.interface';
import { TABLE_HEAD_ROLE } from '../../role.constant';
import RoleListTableRow from './RoleListTableRow';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { useForm } from 'react-hook-form';

function applySortFilter({
  tableData,
  comparator,
  filterName,
}: {
  tableData: IRole[];
  comparator: any;
  filterName: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  let filtered = stabilizedThis.map((el) => el[0]);
  if (filterName) {
    filtered = filtered.filter((role) =>
      role.name.toLowerCase().includes(filterName.toLowerCase())
    );
  }
  return filtered;
}

interface IFormValues {
  search: string;
}

const RoleListTable = () => {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();

  const methods = useForm<IFormValues>();

  // useTable
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'name' });

  const { handleSubmit } = methods;

  // State filter
  const [filterName, setFilterName] = useState('');

  // Fetch roles
  const { data, isLoading, isError } = useGetAllRole({
    page: page + 1,
    limit: rowsPerPage,
  });
  const roleList: IRole[] = data?.metadata?.metadata || [];

  // Filter & sort
  const dataFiltered = applySortFilter({
    tableData: roleList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const isNotFound = !dataFiltered.length && !!filterName;

  // Handler
  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const onSubmit = (data: IFormValues) => {
    console.log('Search submitted:', data.search);
    // Implement search functionality here
    // For example, you can filter the roleList based on the search term
    setFilterName(data.search);
    setPage(0);
  };

  return (
    <Page title="Danh sách vai trò">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Vai trò"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Vai trò', href: PATH_DASHBOARD.role.list },
            { name: 'Danh sách' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.role.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Thêm mới vai trò
            </Button>
          }
        />

        <Card>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
              <RHFTextField
                name="search"
                type="text"
                placeholder="Tìm kiếm tên vai trò..."
                value={filterName}
                onChange={handleFilterName}
              />
            </Stack>
          </FormProvider>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Typography color="error" sx={{ p: 3 }}>
              Lỗi khi lấy danh sách vai trò
            </Typography>
          ) : (
            <>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 600, position: 'relative' }}>
                  <Table size={dense ? 'small' : 'medium'}>
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD_ROLE}
                      rowCount={roleList.length}
                      onSort={onSort}
                    />
                    <TableBody>
                      {dataFiltered
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <RoleListTableRow
                            key={row.id}
                            row={row}
                            onViewRow={() => {
                              navigate(PATH_DASHBOARD.role.view(row.id));
                            }}
                            onEditRow={() => {
                              navigate(PATH_DASHBOARD.role.edit(row.id));
                            }}
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
                  count={dataFiltered.length}
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
            </>
          )}
        </Card>
      </Container>
    </Page>
  );
};

export default RoleListTable;
