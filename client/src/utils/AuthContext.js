import React, { createContext, useState, useEffect } from 'react';
import AuthService from './AuthService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [authChecked, setAuthChecked] = useState(false);

	const handleAuth = async () => {
		const { authenticated, user } = await AuthService.isAuthenticated();
		setAuthChecked(true);
		setAuthenticated(authenticated);
		setUser(user);
    console.log('test');
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
