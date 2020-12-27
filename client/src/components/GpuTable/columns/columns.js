import ColumnCell from './ColumnCell';
import ColumnImageCell from './ColumnImageCell';
import ColumnHeader from './ColumnHeader';

export const COLUMNS = [
	{
		Header: ({ column }) => (
			<ColumnHeader column={column} width='12vw' right={'-4vw'}>
				Image
			</ColumnHeader>
		),
		accessor: 'img',
		Cell: (row) => <ColumnImageCell src={row.row.original.img} />,
		width: '12vw',
		disableSortBy: true,
		disableGlobalFilter: true,
	},
	{
		Header: ({ column }) => (
			<ColumnHeader column={column} width='42vw'>
				Name
			</ColumnHeader>
		),
		accessor: 'title',
		Cell: (row) => (
			<ColumnCell width='42vw'>
				<strong>
					<a href={row.row.original.link}>{row.row.original.title}</a>
				</strong>
			</ColumnCell>
		),
		width: '42vw',
	},
	{
		Header: ({ column }) => (
			<ColumnHeader column={column} width='12vw'>
				Price
			</ColumnHeader>
		),
		accessor: 'price',
		Cell: (row) => {
			const value = isNaN(row.value) ? row.value : `$${Math.round(row.value * 100) / 100}`;
			return <ColumnCell width='12vw'>{value}</ColumnCell>;
		},
		disableGlobalFilter: true,
		width: '12vw',
		fontWeight: 'bold',
	},
	{
		Header: ({ column }) => (
			<ColumnHeader column={column} width='12vw'>
				Brand
			</ColumnHeader>
		),
		accessor: 'brand',
		Cell: (row) => <ColumnCell width='12vw'>{row.row.original.brand}</ColumnCell>,
		width: '12vw',
	},
	{
		Header: ({ column }) => (
			<ColumnHeader column={column} width='6vw'>
				Retailer
			</ColumnHeader>
		),
		accessor: 'retailer',
		Cell: (row) => <ColumnCell width='6vw'>{row.row.original.retailer}</ColumnCell>,
		width: '6vw',
	},
];
