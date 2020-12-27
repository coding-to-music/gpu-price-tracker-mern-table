import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	image: {
		width: '12vw',
		justifyContent: 'center',
		display: 'flex',
		marginLeft: '-4vw',
	},
}));

const ColumnImageCell = ({ src }) => {
	const classes = useStyles();

	return (
		<div className={classes.image}>
			<img height={100} alt='' src={src} />
		</div>
	);
};

export default ColumnImageCell;
