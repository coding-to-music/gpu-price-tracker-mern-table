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
	},
	{
		Header: 'Price',
		accessor: 'price',
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
