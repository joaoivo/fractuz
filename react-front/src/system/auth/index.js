// auth.js
import React, { createContext, useContext, useState } from 'react';
import {Navigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userLoged, setUserLoged] = useState({});

	const login = () => {
		// lógica de login
		setIsAuthenticated(true);
	};

	const logout = () => {
		// lógica de logout
		setIsAuthenticated(false);
		setUserLoged({});
		<Navigate to="/Login" />
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}