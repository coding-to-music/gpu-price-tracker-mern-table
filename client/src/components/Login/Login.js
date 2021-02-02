import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { AuthContext } from '../../utils/AuthContext';
import AuthService from '../../utils/AuthService';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		backgroundColor: '#a90f0f',
		'&:hover': {
			backgroundColor: fade('#a90f0f', 0.75),
		},
		margin: theme.spacing(3, 0, 2),
	},
	input: {
		margin: theme.spacing(2, 0),
	},
}));

const Login = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const { user, setUser, authenticated, setAuthenticated } = useContext(
		AuthContext
	);

	const classes = useStyles();

	const onSubmit = (e) => {
		e.preventDefault();
		setUsername(username.trim().toLowerCase());
		AuthService.login({ username, password }).then((data) => {
			if (data.token) {
				setUser(username);
				setAuthenticated(true);
				props.history.push('/');
			} else {
        console.log(data.message);
			}
		});
	};

	const handleUsernameChange = (e) => {
		e.preventDefault();
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={onSubmit} noValidate>
					<OutlinedInput
						className={classes.input}
						onChange={handleUsernameChange}
						margin='none'
						required
						fullWidth
						placeholder='Username'
					/>
					<OutlinedInput
						className={classes.input}
						onChange={handlePasswordChange}
						margin='none'
						required
						fullWidth
						type='password'
						placeholder='Password'
					/>
					<FormControlLabel
						control={<Checkbox value='remember' color='#a90f0f' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href='#' variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Login;
