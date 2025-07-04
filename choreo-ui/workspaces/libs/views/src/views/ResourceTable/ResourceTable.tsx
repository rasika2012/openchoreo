import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  DataTable,
  SearchBar,
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
        <CardContent>
          <Box display="flex" justifyContent="flex-end">
            <Box width={300}>
              <SearchBar onChange={onSearch} testId="data-table" />
            </Box>
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
