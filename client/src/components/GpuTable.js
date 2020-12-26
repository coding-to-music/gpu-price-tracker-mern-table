import React, { useState } from 'react';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './TablePaginationActions';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { TableToolbar } from './TableToolbar';
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { green } from '@material-ui/core/colors';

import CircularProgress from '@material-ui/core/CircularProgress';

import { usePagination, useSortBy, useGlobalFilter, useTable, useAbsoluteLayout, useBlockLayout } from 'react-table';

const useStyles = makeStyles((theme) => ({
	tableContainer: {
		maxWidth: '99.1vw',
		boxShadow: 'none',
	},
	plusHeader: {
		maxWidth: '20px',
	},
	plusCell: {},
}));

export const GpuTable = ({ columns, data, loading, setData, updateMyData, skipPageReset, setDataFilter }) => {
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		setGlobalFilter,
		preGlobalFilteredRows,
		state: { pageIndex, pageSize, globalFilter },
	} = useTable(
		{
			columns,
			data,
			autoResetPage: !skipPageReset,
			updateMyData,
			initialState: {
				globalFilter: '',
			},
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useBlockLayout,
		(hooks) => {
			hooks.allColumns.push((columns) => [
				// Let's make a column for selection
				{
					id: 'selection',

					Header: '',

					Cell: ({ row }) => (
						<div style={{
              transform: 'translate(+20%, +40%)'
          }}>
							<Checkbox
								icon={<AddIcon style={{ color: '#4caf50', width: '40px', height: '40px' }} />}
								checkedIcon={<RemoveIcon style={{ width: '40px', height: '40px' }} />}
							/>
						</div>
					),
				},
				...columns,
			]);
		}
	);

	const classes = useStyles();

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setPageSize(Number(event.target.value));
	};

	const handleDataCount = () =>
		data.filter((a) =>
			Object.values(a).some((e) => {
				if (Object.prototype.toString.call(e) === '[object String]' && globalFilter !== undefined) {
					return e.toLowerCase().includes(globalFilter.toLowerCase());
				}
				return globalFilter === undefined;
			})
		).length;

	return (
		<TableContainer className={classes.tableContainer}>
			<TableToolbar
				preGlobalFilteredRows={preGlobalFilteredRows}
				setGlobalFilter={setGlobalFilter}
				globalFilter={globalFilter}
			/>

			<MaUTable {...getTableProps()}>
				<TableHead>
					{headerGroups.map((headerGroup) => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<TableCell
									{...(column.id === 'selection'
										? column.getHeaderProps()
										: column.getHeaderProps(column.getSortByToggleProps()))}
								>
									{column.render('Header')}
									{/* {column.id !== 'selection' ? (
										<TableSortLabel
											active={column.isSorted}
											direction={column.isSortedDesc ? 'desc' : 'asc'}
										/>
									) : null} */}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{page.map((row, i) => {
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

				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
							colSpan={3}
							count={handleDataCount()}
							rowsPerPage={pageSize}
							page={pageIndex}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</MaUTable>
		</TableContainer>
	);
};
