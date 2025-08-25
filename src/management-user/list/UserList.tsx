import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
import useTabs from 'src/common/hooks/useTabs';
import useSettings from 'src/common/hooks/useSettings';
import useTable from 'src/common/hooks/useTable';
import { useDebounce } from 'src/common/hooks/useDebounce';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Page from 'src/common/components/Page';
import Iconify from 'src/common/components/Iconify';
import Scrollbar from 'src/common/components/Scrollbar';
import { TableHeadCustom, TableNoData, TableSelectedActions } from 'src/common/components/table';
import UserTableRow from './components/UserTableRow';
import UserTableToolbar from './components/UserTableToolbar';
import UserTableSkeleton from './components/UserTableSkeleton';
import useGetListUser from '../common/hooks/useGetListUser';
import { IUser } from 'src/common/@types/user/user.interface';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'normal', label: 'Hoạt động' },
  { value: 'blocked', label: 'Bị chặn' },
  { value: 'deleted', label: 'Đã xóa' },
  { value: 'pending', label: 'Chờ duyệt' },
  { value: 'suspended', label: 'Tạm ngừng' },
];

const ROLE_OPTIONS = ['all', 'admin', 'customer', 'staff'];

const TABLE_HEAD = [
  { id: 'username', label: 'Tên đăng nhập', align: 'left' },
  { id: 'fullname', label: 'Họ và tên', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'phoneNumber', label: 'Số điện thoại', align: 'left' },
  { id: 'role', label: 'Vai trò', align: 'left' },
  { id: 'emailVerified', label: 'Đã xác thực', align: 'center' },
  { id: 'userStatus', label: 'Trạng thái', align: 'center' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserList() {
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
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<IUser[]>([]);

  const [filterName, setFilterName] = useState('');
  const debouncedFilterName = useDebounce(filterName, 500);
  const [isTyping, setIsTyping] = useState(false);

  const [filterRole, setFilterRole] = useState('all');
  const [isRoleChanging, setIsRoleChanging] = useState(false);

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setIsTyping(true);
    setPage(0);
  };

  const { data, isLoading, isFetching } = useGetListUser({
    page: page + 1,
    limit: rowsPerPage,
    status: filterStatus !== 'all' ? filterStatus : undefined,
    search: debouncedFilterName,
    roleName: filterRole !== 'all' ? filterRole : undefined,
  });

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value);
    setIsRoleChanging(true);
    setPage(0);
  };

  const handleDeleteRow = (userId: number) => {
    const deleteRow = tableData?.filter((row) => row.userId !== userId);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected: string[]) => {
    const selectedIds = selected.map((id) => parseInt(id));
    const deleteRows = tableData?.filter((row) => !selectedIds.includes(row.userId));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id: number) => {
    navigate(PATH_DASHBOARD.user.edit(String(id)));
  };

  useEffect(() => {
    if (data?.metadata?.items) {
      setTableData(data.metadata.items);
    }
  }, [data]);

  useEffect(() => {
    setIsTyping(false);
  }, [debouncedFilterName]);

  useEffect(() => {
    setIsRoleChanging(false);
  }, [data]);

  const isNotFound = !data?.metadata?.items?.length;

  return (
    <Page title="Người dùng: Danh sách">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách người dùng"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Người dùng', href: PATH_DASHBOARD.user.list },
            { name: 'Danh sách' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Thêm người dùng
            </Button>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => String(row.userId))
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
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => String(row.userId))
                    )
                  }
                />

                <TableBody>
                  {isLoading || isFetching || isTyping || isRoleChanging ? (
                    <UserTableSkeleton rowsNum={rowsPerPage} />
                  ) : (
                    data?.metadata?.items?.map((row) => (
                      <UserTableRow
                        key={row.userId}
                        row={row}
                        selected={selected.includes(String(row.userId))}
                        onSelectRow={() => onSelectRow(String(row.userId))}
                        onDeleteRow={() => handleDeleteRow(row.userId)}
                        onEditRow={() => handleEditRow(row.userId)}
                      />
                    ))
                  )}
                  <TableNoData
                    isNotFound={
                      !isLoading && !isFetching && !isTyping && !isRoleChanging && isNotFound
                    }
                  />
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
}
