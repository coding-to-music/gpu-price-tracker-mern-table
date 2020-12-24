import React, { useState } from 'react';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useTable } from 'react-table';

export const GpuTable = ({ columns, data, loading }) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
  };
  
	return (
		<MaUTable {...getTableProps()}>
			<TableHead>
				{headerGroups.map((headerGroup) => (
					<TableRow {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
						))}
					</TableRow>
				))}
			</TableHead>
			{loading ? (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</div>
			) : (
				<TableBody>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<TableRow {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
								})}
							</TableRow>
						);
					})}
				</TableBody>
			)}
		</MaUTable>
	);
};
