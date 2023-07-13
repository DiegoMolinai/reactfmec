import React from 'react';
import { useTable, usePagination, useExpanded } from 'react-table';
import { Box, Button, Grid, Typography, FormControl, Select, MenuItem } from '@mui/material';

const TablaVentas = ({ columns, data, pageSizeOptions }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: pageSizeOptions[0] },
    },
    usePagination
  );

  return (
    <Box>
      <table {...getTableProps()} style={{ width: '100%', marginBottom: '1rem' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ borderBottom: 'solid 1px gray', padding: '10px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', borderBottom: 'solid 1px gray' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </Button>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </Button>
          <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </Button>
          <Typography component="span" sx={{ marginLeft: '10px' }}>
            Página {pageIndex + 1} de {pageOptions.length}
          </Typography>
        </Box>
        <Box>
          <FormControl>
            <Select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {pageSizeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  Mostrar {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default TablaVentas;
