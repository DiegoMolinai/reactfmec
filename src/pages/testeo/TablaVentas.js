import React, { useEffect } from 'react';
import { useTable, usePagination, useExpanded } from 'react-table';
import { Box, Button, Grid, Typography, FormControl, Select, MenuItem} from '@mui/material';

const TablaVentas = ({ columns, data }) => {
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
      initialState: { pageIndex: 0 }, // starts on the first page
    },
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()} style={{ width: '100%', marginBottom:'1rem' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ borderBottom: 'solid 1px gray', padding: '10px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', borderBottom: 'solid 1px gray' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
       </tbody>
      </table>
      <Box sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '1rem', 
    backgroundColor: '#f8f8f8', 
    borderRadius: '4px' 
  }}>
    <Typography>{'Página ' + (pageIndex + 1) + ' de ' + pageOptions.length}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', '& > *': { marginX: '0.5rem' }}}>
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
    </Box>
    <FormControl variant="standard">
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[5, 10, 15, 20, 25].map(pageSize => (
          <MenuItem key={pageSize} value={pageSize}>
            Show {pageSize}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
    </div>
);
};

export default TablaVentas;