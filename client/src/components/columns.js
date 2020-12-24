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
	},
	{
		Header: 'Name',
		accessor: 'title',
		Cell: (row) => {
			return (
				<div style={{ width: 800 }}>
					<strong>
						<a href={row.row.original.link}>{row.row.original.title}</a>
					</strong>
				</div>
			);
		},
	},
	{
		Header: 'Price',
		accessor: 'price',
		Cell: (row) => {
			const value = isNaN(row.value) ? row.value : `$${Math.round(row.value * 100) / 100}`;
			return <div style={{ width: 200 }}>{value}</div>;
		},
	},
	{
		Header: 'Brand',
    accessor: 'brand',
    width: 200
	},
	{
		Header: 'Retailer',
    accessor: 'retailer',
    width: 200
	},
];
