import React, { useState, useMemo, useEffect } from 'react';
import { useTable } from 'react-table';

import { COLUMNS } from './columns';
import api from '../api';

export const GpuTable = () => {
	const [gpuData, setGpuData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const columns = useMemo(() => COLUMNS, []);

	const getGpuData = () => {
		 api.getAllGpus().then((data) => {
      console.log(data);
			setGpuData(data);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		getGpuData();
	}, []);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, gpuData });

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
