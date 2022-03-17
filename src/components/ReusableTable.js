// TableContainer.js
import React from "react"
import { useTable, useSortBy } from "react-table"
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';


const ReuseableTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  },   useSortBy)

    {/* https://mui.com/components/tables/ */}
  return (
   <TableContainer component={Paper} style={{marginTop: "5rem"}}>

    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, j) => (
              <TableCell key={j} {...column.getHeaderProps(column.getSortByToggleProps())} 
              // sortDirection={column.isSorted ? : false}
              > 
              {column.render("Header")}

              {/* { {column.isSorted && <TableSortLabel
              // active={orderBy === headCell.id}
              active={true}
              direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
            >
              {/* {headCell.label} */}
                {/* <Box component="span" sx={visuallyHidden}>
                  {order.isSortedDesc === true ? 'sorted descending' : 'sorted ascending'}
                </Box>
            </TableSortLabel>
            }        */} 
              
              
              </TableCell>
            ))}
        </TableRow>
        ))}
      </TableHead>

      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i)=> {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()} key={i}>
              {row.cells.map((cell,j) => {
                return <TableCell key={j} {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
   </TableContainer> 
  )
}

export default ReuseableTable