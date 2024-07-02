import { useApiDefault } from "../../../../system/Components/Api";
import { useContextAuth } from "../../../../system/Contexts/Auth";
import { ExceptionSystemApiFractuz,apiFractuzEndPoint } from "..";
import { systemConfig } from "../../../../configs";

import { isObjectEmpty } from "../../../../system/Libs/Objects";
import { isStringEmptyOrSpaces } from "../../../../system/Libs/Strings";

export const useApiFractuzFields= ()=>{
	const { isUserAuthenticated, getUserLogged} = useContextAuth();
	const { methodGet , methodPost, methodPut, methodDelete} = useApiDefault();

	const httpGet = async (headerData) => {
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}
		headerData["Authorization"] = "Bearer " + getUserLogged().token;

		const jsonResponse = await methodGet(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDbTableField);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse.dataList;
	}

	const httpInsert = async (headerData,fieldData) => {
		if(isObjectEmpty(fieldData)){throw new ExceptionSystemApiFractuz("Field Object is Empty");}
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}

		if(isObjectEmpty(headerData)){headerData={};}

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		fieldData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodPost(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDbTableField,fieldData);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse;
	}

	const httpUpdate = async (headerData,fieldData) => {
		if(isObjectEmpty(fieldData)){throw new ExceptionSystemApiFractuz("Applications Object is Empty");}
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}

		if(isObjectEmpty(headerData)){headerData={};}

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		fieldData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodPut(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDbTableField,fieldData);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse;
	}

	const httpDelete = async (id) => {
		if(isStringEmptyOrSpaces(id)){throw new ExceptionSystemApiFractuz("Application Delete not possible. No ID");}
		let headerData={};

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		headerData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodDelete(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDbTableField+"/"+id);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}

		return jsonResponse;
	}
	return { httpGet, httpInsert, httpUpdate,httpDelete}
}