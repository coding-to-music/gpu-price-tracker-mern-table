import React, { createContext, useState, useEffect } from 'react';
import AuthService from './AuthService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [authChecked, setAuthChecked] = useState(false);

	const handleAuth = () => {
		AuthService.isAuthenticated().then((data) => {
			if (data.err) {
				console.log('Error: ' + data.message);
				return;
			} else {
				setAuthenticated(data.authenticated);
				setUser(data.user);
			}
			setAuthChecked(true);
		});
	};

	useEffect(() => {
		handleAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, setUser, authenticated, setAuthenticated, authChecked }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
