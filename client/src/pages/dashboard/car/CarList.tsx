import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { useTheme, experimentalStyled as styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  IconButton,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '_redux/store';
import { getCars } from '_redux/slices/car';
// utils
import { fDate } from 'utils/formatTime';
import { fCurrency } from 'utils/formatNumber';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// @types
import { Car, CarState } from '@types/cars';
// components
import Page from 'components/common/Page';
import Label from 'components/common/Label';
import Scrollbar from 'components/common/Scrollbar';
import SearchNotFound from 'components/common/SearchNotFound';
import HeaderBreadcrumbs from 'components/common/HeaderBreadcrumbs';
import {
  CarListHead,
  CarListToolbar
} from 'components/_dashboard/car/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Name', alignCenter: true },
  { id: 'hourlyPrice', label: 'Price by hour', alignCenter: true },
  { id: 'dailyPrice', label: 'Price by day', alignCenter: true },
  { id: 'monthlyPrice', label: 'Price by month', alignCenter: true },
  { id: 'createdAt', label: 'Create at', alignCenter: true },
  { id: 'updated', label: 'Update at', alignCenter: true },
  { id: ''},
];

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Anonymous = Record<string | number, string>;

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: Car[], comparator: (a: any, b: any) => number, query: string) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(
      array,
      (_car) => _car.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function CarList() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { cars } = useSelector((state: { car: CarState }) => state.car);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const selected = cars.map((n) => n.id);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterTitle: string) => {
    setFilterTitle(filterTitle);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cars.length) : 0;

  const filteredCars = applySortFilter(cars, getComparator(order, orderBy), filterTitle);

  const isCartNotFound = filteredCars.length === 0;

  return (
    <Page title="Evs rental cms: List car">
      <Container>
        <HeaderBreadcrumbs
          heading="List Car"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Car',
              href: PATH_DASHBOARD.car.root
            },
            { name: 'List' }
          ]}
        />

        <Card>
          <CarListToolbar
            numSelected={selected.length}
            filterTitle={filterTitle}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <CarListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={cars.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredCars
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          onClick={() => handleClick(row.id)}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Box
                              sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <ThumbImgStyle alt={name} src={row.image} />
                              <Typography variant="subtitle2" noWrap>
                                {row.title}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">{fCurrency(row.hourlyPrice)}</TableCell>
                          <TableCell align="center">{fCurrency(row.dailyPrice)}</TableCell>
                          <TableCell align="center">{fCurrency(row.monthlyPrice)}</TableCell>
                          <TableCell align="center" style={{ minWidth: 160 }}>{fDate(row.createdAt)}</TableCell>
                          <TableCell align="center" style={{ minWidth: 160 }}>{fDate(row.updatedAt)}</TableCell>
                          {/* <TableCell style={{ minWidth: 160 }}>
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={
                                (row.status === 'out_of_stock' && 'error') ||
                                (row.status === 'low_stock' && 'warning') ||
                                'success'
                              }
                            >
                              {inventoryType ? sentenceCase(inventoryType) : ''}
                            </Label>
                          </TableCell> */}
                          <TableCell align="right">
                            <IconButton>
                              <Icon icon={moreVerticalFill} width={20} height={20} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isCartNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterTitle} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cars.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
