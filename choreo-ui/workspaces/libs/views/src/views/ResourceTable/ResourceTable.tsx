import { Avatar, Box, Card, Pagination, TableBody, TableCell, TableContainer, TableDefault, TableHead, TableRow, TableSortLabel, Typography, useChoreoTheme } from '@open-choreo/design-system';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router';

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: string;
  lastUpdated: string;
  href?: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof Resource>(
  order: Order,
  orderBy: Key
): (
  a: Resource,
  b: Resource
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface ResourceTableHeadCell {
  disablePadding: boolean;
  id: keyof Resource;
  label: string;
  numeric: boolean;
}

const resourceTableHeadCells: ResourceTableHeadCell[] = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Resource Name' },
  { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
  { id: 'type', numeric: false, disablePadding: true, label: 'Type' },
  { id: 'lastUpdated', numeric: false, disablePadding: true, label: 'Last Updated' },
];

interface ResourceTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Resource
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function ResourceTableHead(props: ResourceTableHeadProps) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: keyof Resource) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {resourceTableHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export interface ResourceTableProps {
  resources: Resource[];
}

export function ResourceTable(props: ResourceTableProps) {
  const { resources } = props;
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Resource>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useChoreoTheme();
  const navigate = useNavigate();

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof Resource
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleResourceClick = (resource: Resource) => {
    navigate(resource.href || '');
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: string) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Card testId="resource-table">
        <Box>
          <TableContainer>
            <TableDefault
              variant="default"
              aria-labelledby="resourceTableTitle"
              aria-label="resource table"
              testId="resource-table-title"
            >
              <ResourceTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={resources.length}
              />
              <TableBody>
                {stableSort(resources, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((resource, index) => {
                    const labelId = `resource-table-checkbox-${index}`;

                    return (
                      <TableRow
                        onClick={() => handleResourceClick(resource)}
                        key={resource.id}
                      >
                        <TableCell id={labelId} scope="row" padding="none">
                          <Box display="flex" alignItems="center" gap={theme.spacing(1)}>
                            <Avatar testId="resource-avatar">
                              {resource.name.slice(0, 1)}
                            </Avatar>
                            <Box>
                              {resource.href ? (
                                <a
                                  href={resource.href}
                                  style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontWeight: '500'
                                  }}
                                  onClick={(e: MouseEvent) => e.stopPropagation()}
                                >
                                  <Typography variant="caption" color="#333">
                                    {resource.name}
                                  </Typography>
                                </a>
                              ) : (
                                <Typography variant="caption" color="#333">
                                  {resource.name}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body2">
                            {resource.description}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body2">
                            {resource.type}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body2">
                            {new Date(resource.lastUpdated).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </TableDefault>
          </TableContainer>
          <Box>
            <Pagination
              rowsPerPageOptions={[5, 10, 25]}
              count={resources.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              testId="resource-pagination"
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
