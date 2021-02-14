import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import AuthService from '../../utils/AuthService';
import { PromiseProvider } from 'mongoose';

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
		},
		textDecoration: 'none',
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

const NavBar = () => {
	const styles = useStyles();

	const { user, setUser, authenticated, setAuthenticated } = useContext(
		AuthContext
	);

	const handleLogout = async (e) => {
    e.preventDefault();
		const res = await AuthService.logout();
    window.location.reload();
	};

	return (
		<AppBar className={styles.navbar}>
			<Toolbar>
				<Typography variant='h6' noWrap className={styles.navbarTitle}>
					GPU Price Tracker
				</Typography>
				<Typography variant='h6' noWrap>
					<Link to='/' href='#' className={styles.navbarButton}>
						Home
					</Link>
					{!authenticated ? (
						<>
							<Link to='/login' href='#' className={styles.navbarButton}>
								Login
							</Link>
							<Link to='/register' href='#' className={styles.navbarButton}>
								Register
							</Link>
						</>
					) : (
						<>
							<Link to='/saved' href='#' className={styles.navbarButton}>
								Saved
							</Link>
							<Link
								to='/'
								onClick={handleLogout}
								href='#'
								className={styles.navbarButton}
							>
								Logout
							</Link>
						</>
					)}
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
