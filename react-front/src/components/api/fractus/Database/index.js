import { useApiDefault } from "../../../../system/Components/Api";
import { isObjectEmpty } from "../../../../system/Libs/Objects";
import { isStringEmptyOrSpaces } from "../../../../system/Libs/Strings";
import { useContextAuth } from "../../../../system/Contexts/Auth";
import { ExceptionSystemApiFractuz, apiFractuzEndPoint } from "..";
import { systemConfig } from "../../../../configs";

export const useApiFractuzDatabases= ()=>{
	const { isUserAuthenticated, getUserLogged} = useContextAuth();
	const { methodGet , methodPost, methodPut, methodDelete} = useApiDefault();

	const httpGet = async (headerData) => {
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}
		headerData["Authorization"] = "Bearer " + getUserLogged().token;

		const jsonResponse = await methodGet(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDataBase);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse.dataList;
	}

	const httpInsert = async (headerData,DatabaseData) => {
		if(isObjectEmpty(DatabaseData)){throw new ExceptionSystemApiFractuz("Databases Object is Empty");}
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}

		if(isObjectEmpty(headerData)){headerData={};}

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		DatabaseData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodPost(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDataBase,DatabaseData);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse;
	}

	const httpUpdate = async (headerData,DatabaseData) => {
		if(isObjectEmpty(DatabaseData)){throw new ExceptionSystemApiFractuz("Databases Object is Empty");}
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}

		if(isObjectEmpty(headerData)){headerData={};}

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		DatabaseData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodPut(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDataBase,DatabaseData);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse;
	}

	const httpDelete = async (id) => {
		if(isStringEmptyOrSpaces(id)){throw new ExceptionSystemApiFractuz("Database Delete not possible. No ID");}
		let headerData={};

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		headerData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodDelete(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDataBase+"/"+id);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}

		return jsonResponse;
	}
	return { httpGet, httpInsert, httpUpdate,httpDelete}
}