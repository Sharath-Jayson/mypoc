// TableContainer.js
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PropTypes from 'prop-types';

const ReuseableTable = ({ columns, data, initialState }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState
    },
    useSortBy
  );

  {
    /* https://mui.com/components/tables/ */
  }
  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <TableCell
                  key={j}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  sortDirection={column.isSorted ? (column.isSortedDesc ? 'desc' : 'asc') : false}
                >
                  {column.render('Header')}

                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc === true ? 'desc' : 'asc'}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={i}>
                {row.cells.map((cell, j) => {
                  return (
                    <TableCell key={j} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ReuseableTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  initialState: PropTypes.object
};

export default ReuseableTable;
