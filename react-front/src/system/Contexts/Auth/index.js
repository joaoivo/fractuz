// auth.js
import { createContext, useContext } from 'react';

import { isStringEmptyOrSpaces } from '../../Libs/Strings';
import { isObjectEmpty,getObectPropertiesFilter } from '../../Libs/Objects';
import { getCaesarDecrypt, getCaesarEncrypt } from '../../Libs/Crypto';

const ContextAuth = createContext();

export function ContextAuthProvider({ children }) {

	const sessionUserIDKey = 'user';
	const sessionUserCaesarShift = 3;

	class ExceptionContextAuth extends Error {
		constructor(mensagem) {
			super(mensagem);
			this.name = this.constructor.name;
			this.data = { mensagem };
		}
	}

	const setUserLogged = (userRawData)=>{
		const user = getObectPropertiesFilter(userRawData,["name","mail","token"]);
		if(isObjectEmpty(userRawData)){return;}

		sessionStorage.setItem(sessionUserIDKey, getCaesarEncrypt(JSON.stringify(user),sessionUserCaesarShift));
	}
	const unsetUserLogged = () =>{
		sessionStorage.removeItem(sessionUserIDKey);
	}

	const getUserLogged = ()=>{
		if(sessionStorage.getItem(sessionUserIDKey)===undefined)	{return null;}
		if(sessionStorage.getItem(sessionUserIDKey)===null)		{return null;}

		const userData = getCaesarDecrypt(sessionStorage.getItem(sessionUserIDKey),sessionUserCaesarShift);
		const user = JSON.parse(userData);

		if(isObjectEmpty(user)){throw new ExceptionContextAuth("Object user is null");}
		if(!isUserValid(user)){
			const messages = getUserValidationList(user);
			throw new ExceptionContextAuth("Object user is isvalid ("+messages.join(", ")+")");
		}

		return user;
	}

	const isUserAuthenticated = ()=>{
		const user = getUserLogged();
		return (!!user)
	}

	const getUserValidationList = (user)=>{
		const messages = [];

		if(isObjectEmpty(user)){
			return ["O objeto 'usuário' está vazio"]
		}

		if(!user.hasOwnProperty("name")){
			messages.push("Não tem nome")
		}else if(isStringEmptyOrSpaces(user.name)){
			messages.push("Nome não pode ser vazio")
		}else if(user.name.length<=5){
			messages.push("Nome não pode ter menos de 5 letras")
		}
		
		if(!user.hasOwnProperty("mail")){
			messages.push("Não tem e-mail")
		}else if(isStringEmptyOrSpaces(user.mail)){
			messages.push("E-mail não pode ser vazio")
		}else if(user.mail.length<=5){
			messages.push("E-mail não pode ter menos de 5 caractéres")
		}

		if(!user.hasOwnProperty("token")){
			messages.push("Não tem token")
		}else if(isStringEmptyOrSpaces(user.token)){
			messages.push("Token não pode ser vazio")
		}else if(user.token.length<=300){
			messages.push("Tome não pode ter menos de 300 caractéres")
		}

		return messages;
	}

	const isUserValid = (userData) =>{
		return (getUserValidationList(userData).length<=0);
	}

	const login = (user) => {
		if(isUserAuthenticated()){return ["Já existe uma autênticação"];}

		const messages = getUserValidationList(user);
		if(messages.length>0){ return messages;}

		setUserLogged(user);
		return [];
	};

	const logout = () => {
		unsetUserLogged();
	};

	return (
		<ContextAuth.Provider value={{ ExceptionContextAuth, isUserAuthenticated, login, logout, getUserLogged}}>
			{children}
		</ContextAuth.Provider>
	);
}

export function useContextAuth() {
	return useContext(ContextAuth);
}