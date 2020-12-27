import React from 'react';
import Typography from '@material-ui/core/Typography';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const ColumnHeader = (props) => (
	<div style={{ width: props.width, textAlign: 'left', marginRight: props.right !== undefined ? props.right : 0 }}>
		<Typography variant='body1'>
			<strong>{props.children}</strong>
			<TableSortLabel active={props.column.isSorted} direction={props.column.isSortedDesc ? 'desc' : 'asc'} />
		</Typography>
	</div>
);

export default ColumnHeader;
