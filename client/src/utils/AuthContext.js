import React, { createContext, useState, useEffect } from 'react';
import AuthService from './AuthService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		AuthService.isAuthenticated().then(({ authenticated, user }) => {
			setUser(user);
			setAuthenticated(authenticated);
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, setUser, authenticated, setAuthenticated }}
		>
			{ children }
		</AuthContext.Provider>
	);
};

export default AuthProvider;
