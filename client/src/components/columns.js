import TableSortLabel from '@material-ui/core/TableSortLabel';

export const COLUMNS = [
	{
		Header: ({ column }) => {
			return (
				<div style={{ width: '12vw', textAlign: 'center', marginLeft: '-4vw' }}>
					<strong>Image</strong>
					<TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
				</div>
			);
		},
		accessor: 'img',
		Cell: (row) => (
			<div style={{ width: '12vw', justifyContent: 'center', display: 'flex', marginLeft: '-4vw' }}>
				<img height={100} src={row.row.original.img} />
			</div>
		),
		width: '12vw',
	},
	{
		Header: ({ column }) => (
			<div style={{ width: '42vw', textAlign: 'center' }}>
				<strong>Name</strong>
				<TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
			</div>
		),
		accessor: 'title',
		Cell: (row) => {
			return (
				<div style={{ width: '42vw', padding: 20 }}>
					<strong>
						<a href={row.row.original.link}>{row.row.original.title}</a>
					</strong>
				</div>
			);
		},
		width: '42vw',
	},
	{
		Header: ({ column }) => (
			<div style={{ width: '12vw' }}>
				<strong>Price</strong>
				<TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
			</div>
		),
		accessor: 'price',
		Cell: (row) => {
			const value = isNaN(row.value) ? row.value : `$${Math.round(row.value * 100) / 100}`;
			return <div style={{ width: '12vw' }}>{value}</div>;
		},
		disableGlobalFilter: true,
		width: '12vw',
		fontWeight: 'bold',
	},
	{
		Header: ({ column }) => (
			<div style={{ width: '12vw' }}>
				<strong>Brand</strong>
				<TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
			</div>
		),
		accessor: 'brand',
		Cell: (row) => <div style={{ width: '12vw' }}>{row.row.original.brand}</div>,
		width: '12vw',
	},
	{
		Header: ({ column }) => (
			<div style={{ width: '6vw' }}>
				<strong>Retailer</strong>
				<TableSortLabel active={column.isSorted} direction={column.isSortedDesc ? 'desc' : 'asc'} />
			</div>
		),
		accessor: 'retailer',
		Cell: (row) => <div style={{ width: '6vw' }}>{row.row.original.retailer}</div>,
		width: '6vw',
	},
];
