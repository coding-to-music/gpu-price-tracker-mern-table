export const COLUMNS = [
	{
		Header: 'Image',
		accessor: 'img',
		Cell: (row) => {
			return (
				<div style={{ width: 150 }}>
					<img height={100} src={row.row.original.img} />
				</div>
			);
    },
    minWidth: 150,
    maxWidth: 150,
	},
	{
		Header: 'Name',
		accessor: 'title',
		Cell: (row) => {
			return (
				<div style={{ width: 850, padding: 20 }}>
					<strong>
						<a href={row.row.original.link}>{row.row.original.title}</a>
					</strong>
				</div>
			);
    },
    minWidth: 900,
    maxWidth: 900
	},
	{
		Header: 'Price',
		accessor: 'price',
		Cell: (row) => {
			const value = isNaN(row.value) ? row.value : `$${Math.round(row.value * 100) / 100}`;
			return <div style={{ width: 200 }}>{value}</div>;
    },
    disableGlobalFilter: true,
    width: 200,
    maxWidth: 200,
	},
	{
		Header: 'Brand',
    accessor: 'brand',
    minWidth: 200,
    maxWidth: 200
	},
	{
		Header: 'Retailer',
    accessor: 'retailer',
    minWidth: 200,
    maxWidth: 200
	},
];
