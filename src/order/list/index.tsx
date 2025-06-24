import sumBy from 'lodash/sumBy';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
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
// hooks
import useTabs from '../../common/hooks/useTabs';
import useSettings from '../../common/hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../common/hooks/useTable';
// components
import Page from '../../common/components/Page';
import Label from '../../common/components/Label';
import Iconify from '../../common/components/Iconify';
import Scrollbar from '../../common/components/Scrollbar';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../common/components/table';
// You need to implement or import these:
import { IOrder, IOrderParams } from '../../common/@types/order/order.interface';
import { useGetListOrder } from '../hooks/useGetOrderList';
import OrderTableRow from '../components/list/OrderTableRow';
import OrderTableToolbar from '../components/list/OrderTableToolbar';
import OrderAnalytic from '../components/list/OrderAnalytic';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'orderNumber', label: 'Order', align: 'left' },
  { id: 'customer', label: 'Customer', align: 'left' },
  { id: 'createDate', label: 'Created', align: 'left' },
  { id: 'totalAmount', label: 'Amount', align: 'center', width: 140 },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function OrderList() {
  const theme = useTheme();

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
  } = useTable({ defaultOrderBy: 'createDate' });

  // State for filters
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);

  // Build params for API
  const params: IOrderParams = {
    status: filterStatus !== 'all' ? (filterStatus as any) : undefined,
    startDate: filterStartDate ? filterStartDate.toISOString() : undefined,
    endDate: filterEndDate ? filterEndDate.toISOString() : undefined,
    search: filterName || undefined,
    page: page + 1,
    limit: rowsPerPage,
  };

  // Fetch order list from API
  const { data: orderData } = useGetListOrder(params);
  const tableData: IOrder[] = orderData?.metadata?.items || [];

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  // Update handler to match (event: React.SyntheticEvent, value: string)
  const handleFilterStatus = (event: React.SyntheticEvent, value: string) => {
    setFilterStatus(value);
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

  const handleDeleteRow = (id: string) => {
    // TODO: Implement API call to delete the order, then refetch data if needed
    setSelected([]);
    // setTableData is not available; data comes from API
  };

  const handleDeleteRows = (selected: string[]) => {
    // TODO: Implement API call to delete multiple orders, then refetch data if needed
    setSelected([]);
    // setTableData is not available; data comes from API
  };

  const handleViewRow = (id: string) => {
    navigate(`/order/${id}`);
  };

  const getLengthByStatus = (status: string) =>
    tableData.filter((item) => item.status === status).length;

  const getTotalAmountByStatus = (status: string) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      (item) => Number(item.totalAmount)
    );

  const getPercentByStatus = (status: string) =>
    tableData.length > 0 ? (getLengthByStatus(status) / tableData.length) * 100 : 0;

  const TABS = [
    { value: 'all', label: 'Tất cả', color: 'info', count: tableData.length },
    {
      value: 'pending_confirmation',
      label: 'Chờ xác nhận',
      color: 'warning',
      count: getLengthByStatus('pending_confirmation'),
    },
    {
      value: 'pending_pickup',
      label: 'Chờ lấy hàng',
      color: 'primary',
      count: getLengthByStatus('pending_pickup'),
    },
    { value: 'shipping', label: 'Đang giao', color: 'info', count: getLengthByStatus('shipping') },
    {
      value: 'delivered',
      label: 'Đã giao',
      color: 'success',
      count: getLengthByStatus('delivered'),
    },
    {
      value: 'returned',
      label: 'Trả hàng',
      color: 'default',
      count: getLengthByStatus('returned'),
    },
    { value: 'cancelled', label: 'Đã hủy', color: 'error', count: getLengthByStatus('cancelled') },
  ] as const;

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const isNotFound = !dataFiltered.length && !!filterName;

  const denseHeight = dense ? 56 : 76;

  return (
    <Page title="Đơn hàng: Danh sách">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách đơn hàng"
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Đơn hàng', href: '/order' },
            { name: 'Danh sách' },
          ]}
        />

        <Card sx={{ mb: 5 }}>
          <OrderAnalytic />
        </Card>

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={<Label color={tab.color}> {tab.count} </Label>}
                label={tab.label}
              />
            ))}
          </Tabs>

          <Divider />

          <OrderTableToolbar
            filterStatus={filterStatus}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            filterName={filterName}
            onFilterStatus={handleFilterStatus}
            onFilterStartDate={setFilterStartDate}
            onFilterEndDate={setFilterEndDate}
            onFilterName={setFilterName}
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
                      tableData.map((row) => String(row.id))
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
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
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => String(row.id))
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(String(row.id))}
                        onSelectRow={() => onSelectRow(String(row.id))}
                        onViewRow={() => handleViewRow(String(row.id))}
                        onDeleteRow={() => handleDeleteRow(String(row.id))}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
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
              count={orderData?.metadata?.meta?.totalItems || 0}
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

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
}: {
  tableData: IOrder[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: IOrder) =>
        item.id.toString().includes(filterName) ||
        item.address?.receiverName?.toLowerCase().includes(filterName.toLowerCase())
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item: IOrder) => item.status === filterStatus);
  }

  return tableData;
}
