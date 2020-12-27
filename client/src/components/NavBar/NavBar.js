import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	navbar: {
		background: '#a90f0f',
		position: 'relative',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	navbarTitle: {
		fontWeight: 'bold',
		margin: theme.spacing(0, 0, 0, 8),
	},
	navbarButton: {
		color: '#ef9a9a',
		margin: theme.spacing(0, 0, 0, 10),
		'&:hover': {
			color: fade(theme.palette.common.white, 0.75),
			textDecoration: 'none',
		},
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

export const NavBar = () => {
	const styles = useStyles();

	const preventDefault = (event) => event.preventDefault();

	return (
		<AppBar className={styles.navbar}>
			<Toolbar>
				<Typography variant='h6' noWrap className={styles.navbarTitle}>
					GPU Price Tracker
				</Typography>
				<Typography variant='h6' noWrap>
					<Link href='#' onClick={preventDefault} className={styles.navbarButton} to='/saved'>
						Home
					</Link>
					<Link href='#' onClick={preventDefault} className={styles.navbarButton}>
						Saved
					</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
