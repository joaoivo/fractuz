import { useContextConsole } from '../../../system/Contexts/Console';
import { useContextAuth } from '../../../system/Contexts/Auth';
import { config } from '../../../system/Constants';

import { useApiDefault } from '..';

export const apiFractuzEndPoint={
	 login: "/Login"
	,adminUsers:"/Admin/User"
	,application:"/Application"
	,appDataBase:"/AppDataBase"
	,appDbTable:"/AppDbTable"
	,appDbTableField:"/AppDbTableField"
}

export const useApiFractuz = () => {
	const { addHistoryLog } = useContextConsole();
	const { isUserAuthenticated, getUserLogged} = useContextAuth();
	const { ExceptionApiDefault,methodGet } = useApiDefault();

	class ExceptionApiFractuz extends Error {
		constructor(mensagem) {
			super(mensagem);
			this.name = this.constructor.name;
			this.data = { mensagem };
		}
	}

	const getLoginToken = async (mail, pass) => {
		const myHeaders = new Headers();

		myHeaders.append("mail", mail);
		myHeaders.append("pass", pass);

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		try {
			const response = await fetch(config.urls.PUBLIC_API_URL + apiFractuzEndPoint.login, requestOptions);
			const result = await response.text();
			return JSON.parse(result);
		} catch (err) {
			addHistoryLog("ops! ocorreu um erro na tentativa de acesso a API:" + err);
			//throw err; 
		}
	};

	const getApplicationList = async (searchData) => {

		if(!isUserAuthenticated()){throw new ExceptionApiFractuz("User not Auhenticated");}
		searchData["Authorization"] = "Bearer " + getUserLogged().token;

		const response = await methodGet(searchData,config.urls.PUBLIC_API_URL + apiFractuzEndPoint.application);
		const result 	= await response.text();

		return JSON.parse(result);
	};

	return { getLoginToken , getApplicationList,ExceptionApiDefault};
};
