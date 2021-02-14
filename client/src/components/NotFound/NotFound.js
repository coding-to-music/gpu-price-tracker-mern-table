import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	error: {
		width: 75,
		height: 75,
		marginBottom: theme.spacing(8),
	},
}));

const NotFound = () => {
	const classes = useStyles();

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<ErrorOutlineIcon className={classes.error} />
				<Typography component='h1' variant='h6'>
					The page you're looking for was not found!
				</Typography>
			</div>
		</Container>
	);
};

export default NotFound;
