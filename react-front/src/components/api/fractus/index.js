import { useContextConsole } from '../../../system/Contexts/Console';
import { config } from '../../../system/Constants';

export const apiFractuzEndPoint={
	 login: "/Login"
	,adminUsers:"/Admin/User"
	,AppDataBase:"/AppDataBase"
	,AppDbTable:"/AppDbTable"
	,AppDbTableField:"/AppDbTableField"
}

export const useApiFractuz = () => {
	const { addHistoryLog } = useContextConsole();

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

	return { getLoginToken };
};
