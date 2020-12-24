export const COLUMNS = [
	{
		Header: 'Image',
		accessor: 'img',
		Cell: (row) => {
			return (
				<div>
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
				<div>
					<a href={row.row.original.link}>{row.row.original.title}</a>
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
	},
	{
		Header: 'Retailer',
		accessor: 'retailer',
	},
];
