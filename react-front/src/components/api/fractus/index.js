import { useContextAuth } 									from '../../../system/Contexts/Auth';
import { systemConfig } from '../../../configs';
import { useApiDefault, ExceptionSystemApiDefault}	from '../../../system/Components/Api';
import { isObjectEmpty } from '../../../system/Libs/Objects';
import { isStringEmptyOrSpaces } from '../../../system/Libs/Strings';

export class ExceptionSystemApiFractuz extends ExceptionSystemApiDefault {
	constructor(mensagem) {
		super(mensagem);
		this.name = this.constructor.name;
		this.data = { mensagem };
	}
}

export const apiFractuzEndPoint={
	 login: "/Login"
	,adminUsers:"/Admin/User"
	,application:"/Application"
	,appDataBase:"/AppDataBase"
	,appDbTable:"/AppDbTable"
	,appDbTableField:"/AppDbTableField"
}

export const useApiFractuz = () => {
	const { isUserAuthenticated, getUserLogged} = useContextAuth();
	const { methodGet , methodPost, methodPut, methodDelete} = useApiDefault();

	const getLoginToken = async (loginData) => {
		const jsonResponse = await methodGet(loginData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.login);
		if(jsonResponse.code !==0){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro ${jsonResponse.code}: Message: ${jsonResponse.description}`);}
		return jsonResponse;
	};

	const Application = {
		 get : async (headerData) => {
			if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}
			headerData["Authorization"] = "Bearer " + getUserLogged().token;
	
			const jsonResponse = await methodGet(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.application);
			if(jsonResponse.code !==0){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro ${jsonResponse.code}: Message: ${jsonResponse.description}`);}
			return jsonResponse.dataList;
		}
		,insert: async (headerData,ApplicationData) => {
			if(isObjectEmpty(ApplicationData)){throw new ExceptionSystemApiFractuz("Applications Object is Empty");}
			if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}
	
			if(isObjectEmpty(headerData)){headerData={};}
	
			const user = getUserLogged();
			headerData["Authorization"] = "Bearer " + user.token;
			ApplicationData["SystemCreationUser"] = user.userID;
	
			const jsonResponse = await methodPost(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.application,ApplicationData);
			if(jsonResponse.code !==0){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro ${jsonResponse.code}: Message: ${jsonResponse.description}`);}
			return jsonResponse;
		}
		,update : async (headerData,ApplicationData) => {
			if(isObjectEmpty(ApplicationData)){throw new ExceptionSystemApiFractuz("Applications Object is Empty");}
			if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}
	
			if(isObjectEmpty(headerData)){headerData={};}
	
			const user = getUserLogged();
			headerData["Authorization"] = "Bearer " + user.token;
			ApplicationData["SystemCreationUser"] = user.userID;
	
			const jsonResponse = await methodPut(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.application,ApplicationData);
			if(jsonResponse.code !==0){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro ${jsonResponse.code}: Message: ${jsonResponse.description}`);}
			return jsonResponse;
		}
		,delete : async (id) => {
			if(isStringEmptyOrSpaces(id)){throw new ExceptionSystemApiFractuz("Application Delete not possible. No ID");}
			let headerData={};
	
			const user = getUserLogged();
			headerData["Authorization"] = "Bearer " + user.token;
			headerData["SystemCreationUser"] = user.userID;
			headerData["guid"] = id;		
	
			const jsonResponse = await methodDelete(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.application);
			if(jsonResponse.code !==0){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro ${jsonResponse.code}: Message: ${jsonResponse.description}`);}
	
			return jsonResponse;
		}
	}

	return { getLoginToken , Application};
};
