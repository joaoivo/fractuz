// auth.js
import React, { createContext, useContext, useState } from 'react';
import {Navigate,useLocation } from 'react-router-dom';

import { routesPublicPages } from '../../../pages/routes';

const ContextAuth = createContext();

export function ContextAuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userLoged, setUserLoged] = useState({});
	const location = useLocation();

	const login = () => {
		// lógica de login
		setIsAuthenticated(true);
	};

	const logout = () => {
		// lógica de logout
		setIsAuthenticated(false);
		setUserLoged({});
		console.log(location.pathname);
		if(routesPublicPages.Login.path !== location.pathname){
			<Navigate to={routesPublicPages.Login.path} />
		}
	};

	return (
		<ContextAuth.Provider value={{ isAuthenticated,userLoged , login, logout, setUserLoged}}>
			{children}
		</ContextAuth.Provider>
	);
}

export function useContextAuth() {
	return useContext(ContextAuth);
}