import React, { useState, useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import AuthService from '../../utils/AuthService';
import { AuthContext } from '../../utils/AuthContext';
import Alert from '@material-ui/lab/Alert';

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
		minHeight: '3rem',
	},
	alert: {
		margin: theme.spacing(10, 0),
	},
}));

const Register = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState('error');

	const { user, setUser, authenticated, setAuthenticated } = useContext(
		AuthContext
	);

	const classes = useStyles();

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords don't match");
			return;
		}
		setUsername(username.trim().toLowerCase());
		AuthService.register({ username, password }).then((data) => {
			if (data.user) {
				setSeverity('success');
				setMessage(data.message);
				setTimeout(() => {
					props.history.push('/');
				}, 5000);
			} else {
				setMessage(data.message);
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

	const handleConfirmPasswordChange = (e) => {
		e.preventDefault();
		setConfirmPassword(e.target.value);
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Register
				</Typography>
				<form className={classes.form} onSubmit={onSubmit} noValidate>
					<TextField
						className={classes.input}
						onChange={handleUsernameChange}
						margin='none'
						variant='outlined'
						required
						fullWidth
						placeholder='Username'
					/>
					<TextField
						className={classes.input}
						onChange={handlePasswordChange}
						margin='none'
						variant='outlined'
						required
						fullWidth
						type='password'
						placeholder='Password'
					/>
					<TextField
						className={classes.input}
						onChange={handleConfirmPasswordChange}
						margin='none'
						variant='outlined'
						required
						fullWidth
						type='password'
						placeholder='Confirm Password'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						className={classes.submit}
					>
						Register
					</Button>
					{message === '' ? null : (
						<Alert
							className={classes.alert}
							variant='outlined'
							severity={severity}
						>
							{message}
						</Alert>
					)}
				</form>
			</div>
		</Container>
	);
};

export default Register;
