// auth.js
import { createContext, useContext, useState } from 'react';
import {Navigate,useLocation } from 'react-router-dom';

import { routesPrivatePages, routesPublicPages } from '../../../pages/routes';
import { useContextConsole } from '../Console';

const ContextAuth = createContext();

export function ContextAuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userLoged, setUserLoged] = useState({});
	const {addHistoryLog} = useContextConsole();
	const location = useLocation();

	const login = (user) => {
		const {name,mail,token} = user;
		const messages = [];
		if(!!!name){
			messages.push("Nome não pode ser vazio")
		}else if(name.lenght<=5){
			messages.push("Nome não pode ter menos de 5 letras")
		}
		
		if(!!!mail){
			messages.push("E-mail não pode ser vazio")
		}else if(mail.lenght<=5){
			messages.push("E-mail não pode ter menos de 5 caractéres")
		}

		if(!!!token){
			messages.push("Token não pode ser vazio")
		}else if(token.lenght<=300){
			messages.push("Tome não pode ter menos de 300 caractéres")
		}

		if(!!messages){
			setUserLoged({name,mail,token});
			setIsAuthenticated(()=>true);
			
			addHistoryLog("Login concluído com sucesso! Redirecionando para página de Dashboard");
			return <Navigate to={routesPrivatePages.Home.path} />
		}

		return messages;
	};

	const logout = () => {
		setIsAuthenticated(false);
		setUserLoged({});
		
		if(routesPublicPages.Login.path !== location.pathname){
			addHistoryLog("Logoff concluído com sucesso! Redirecionando para página de login");

			return <Navigate to={routesPublicPages.Login.path} />
		}else{
			addHistoryLog("Logoff concluído com sucesso!");
		}
	};

	return (
		<ContextAuth.Provider value={{ isAuthenticated,userLoged , login, logout}}>
			{children}
		</ContextAuth.Provider>
	);
}

export function useContextAuth() {
	return useContext(ContextAuth);
}