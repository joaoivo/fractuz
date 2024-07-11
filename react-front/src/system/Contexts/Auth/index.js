// auth.js
import { createContext, useContext } from 'react';

import { isStringEmptyOrSpaces } from '../../Libs/Strings';
import { isObjectEmpty,getObectPropertiesFilter } from '../../Libs/Objects';
import { getCaesarDecrypt, getCaesarEncrypt } from '../../Libs/Crypto';

import { ExceptionSystemDefault } from '../../Components/Exceptions';
import { useApiFractuzUsers } from '../../../components/api/fractus/Users';
import { getCurrentDateTimeStamp } from '../../Libs/DateTimes';

const ContextAuth = createContext();
export 	class ExceptionSystemContextAuth extends ExceptionSystemDefault {
	constructor(mensagem) {
		super(mensagem);
		this.name = this.constructor.name;
		this.data = { mensagem };
	}
}

export function ContextAuthProvider({ children }) {
	const { getLoginToken,getTokenRenovation } = useApiFractuzUsers();

	const sessionUserIDKey = 'user';
	const sessionUserCaesarShift = 3;

	const setUserLogged = (userRawData)=>{
		const user = getObectPropertiesFilter(userRawData,["name","mail","token","userID","tokenRenovation"]);
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

		if(isObjectEmpty(user)){throw new ExceptionSystemContextAuth("Object user is null");}
		if(!isUserValid(user)){
			const messages = getUserValidationList(user);
			throw new ExceptionSystemContextAuth("Object user is isvalid ("+messages.join(", ")+")");
		}

		return user;
	}

	const renovateToken = (user)=>{
		if(isObjectEmpty(user)){return user;}
		if(!("tokenRenovation" in user)){return user;}

		try{
			let tokenRenovation = parseInt(user.tokenRenovation)/100;
			let dateTimeValidation = parseInt(getCurrentDateTimeStamp())/100;

			if(dateTimeValidation>tokenRenovation){
				let jsonResponse;
				getTokenRenovation(user.token)
					.then((result)=>{jsonResponse = result;})
					.catch((error)=>{throw error;});
				if(jsonResponse.isSuccess){
					user = jsonResponse.dataList[0];
					setUserLogged(user);
					console.log("token renovated");
				}
			}
		}catch(ex){
			console.log("Error on token Renovation",ex);
		}

		return user;
	}

	const isUserAuthenticated = ()=>{
		let user = getUserLogged();
		user = renovateToken(user);
		if(isObjectEmpty(user)){return false;}
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
			messages.push("Token não pode ter menos de 300 caractéres")
		}
		
		if(!user.hasOwnProperty("userID")){
			messages.push("Não tem userID")
		}else if(isStringEmptyOrSpaces(user.userID)){
			messages.push("userID não pode ser vazio")
		}else if(user.userID.length<=30){
			messages.push("userID não pode ter menos de 30 caractéres")
		}

		return messages;
	}

	const isUserValid = (userData) =>{
		return (getUserValidationList(userData).length<=0);
	}

	const login = async (requestData) => {
		const response = await getLoginToken(requestData);

		logout();
		if(isUserAuthenticated()){return ["Já existe uma autênticação"];}

		if(!response.isSuccess){return [`Login não autorizado: ${response.description}`];}
		let user = response.dataList[0];

		const messages = getUserValidationList(user);
		if(messages.length>0){ return messages;}

		setUserLogged(user);
		return [];
	};

	const logout = () => {
		unsetUserLogged();
	};

	return (
		<ContextAuth.Provider value={{ ExceptionSystemContextAuth, isUserAuthenticated, login, logout, getUserLogged}}>
			{children}
		</ContextAuth.Provider>
	);
}

export function useContextAuth() {
	return useContext(ContextAuth);
}