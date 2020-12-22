import React from 'react';
import { useTable } from 'react-table';

export const GpuTable = ({ columns, data }) => {

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => {
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => {
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>;
						})}
						<th></th>
					</tr>;
				})}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
							})}
						</tr>
					);
				})}
				<tr>
					<td></td>
				</tr>
			</tbody>
		</table>
	);
};
