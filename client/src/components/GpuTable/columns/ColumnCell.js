import React from 'react';
import Typography from '@material-ui/core/Typography';

const ColumnCell = (props) => (
	<div style={{ width: props.width, paddingTop: 20 }}>
		<Typography variant='body1'>{props.children}</Typography>
	</div>
);

export default ColumnCell;
