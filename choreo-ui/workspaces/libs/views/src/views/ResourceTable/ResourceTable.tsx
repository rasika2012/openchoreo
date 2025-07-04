import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  DataTable,
  SearchBar,
  TableContainer,
  TableDefault,
} from '@open-choreo/design-system';
import { DataTableColumn } from '@open-choreo/design-system/dist/components/DataTable/DataTable';
import { useState } from 'react';

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: string;
  lastUpdated: string;
  href?: string;
}

export interface ResourceTableProps {
  resources: Resource[];
}

export function ResourceTable(props: ResourceTableProps) {
  const { resources } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const onSearch = (data: any) => {
    setSearchQuery(data);
  };
  const onDeleteMember = (idpId: string, displayName: string) => {
    console.log('Delete member', idpId, displayName);
  };

  const onRowClick = (rowData: Resource) => {
    console.log('Row clicked', rowData);
  };

  const DeleteBtn = ({ onClick }: any) => (
    <Button color="error" onClick={onClick} size="small" testId="delete-button">
      Delete
    </Button>
  );

  const resourceListColumns: DataTableColumn<Resource>[] = [
    {
      title: 'Resource Name',
      field: 'name',
      width: '25%',
      render: (rowData: Resource) => {
        const { id, name } = rowData;
        return (
          <Box display="flex" alignItems="center" gap={8}>
            {name ? <Avatar /> : <Avatar />}
            <Box>
              {name === 'null' || name === null ? (
                <span>{id}</span>
              ) : (
                <span>{name}</span>
              )}
            </Box>
          </Box>
        );
      },
    },
    {
      title: 'Description',
      field: 'description',
      width: '25%',
    },
    {
      title: 'Type',
      field: 'type',
      width: '25%',
    },
    {
      title: 'Last Updated',
      field: 'lastUpdated',
      align: 'right',
      width: '25%',
      render: (rowData: Resource, isHover: boolean) => {
        if (isHover && rowData?.id.length > 0) {
          return (
            <DeleteBtn
              onClick={(event: any) => {
                event.stopPropagation();
                onDeleteMember(rowData?.id, rowData?.name);
              }}
            />
          );
        }
        return <span>{rowData.lastUpdated}</span>;
      },
    },
  ];

  return (
    <Box>
      <Card testId="resource-table">
        <Box width={300}>
          <SearchBar onChange={onSearch} testId="data-table" />
        </Box>
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
                rowCount={resources?.length}
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
              count={resources?.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              testId="resource-pagination"
            />
          </Box>
          <DataTable<Resource>
            enableFrontendSearch
            getRowId={(rowData) => rowData.id}
            columns={resourceListColumns}
            testId="table"
            isLoading={false}
            searchQuery={searchQuery}
            data={resources}
            totalRows={resources.length}
            onRowClick={onRowClick}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
