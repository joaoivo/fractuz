import { useApiDefault } from "../../../../system/Components/Api";
import { useContextAuth } from "../../../../system/Contexts/Auth";
import { ExceptionSystemApiFractuz,apiFractuzEndPoint } from "..";
import { systemConfig } from "../../../../configs";

import { isObjectEmpty } from "../../../../system/Libs/Objects";
import { isStringEmptyOrSpaces } from "../../../../system/Libs/Strings";

export const useApiFractuzTables= ()=>{
	const { isUserAuthenticated, getUserLogged} = useContextAuth();
	const { methodGet , methodPost, methodPut, methodDelete} = useApiDefault();

	const httpGet = async (headerData) => {
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}
		headerData["Authorization"] = "Bearer " + getUserLogged().token;

		const jsonResponse = await methodGet(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDbTable);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse.dataList;
	}

	const httpInsert = async (headerData,tableData) => {
		if(isObjectEmpty(tableData)){throw new ExceptionSystemApiFractuz("Tables Object is Empty");}
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}

		if(isObjectEmpty(headerData)){headerData={};}

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		tableData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodPost(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDbTable,tableData);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse;
	}

	const httpUpdate = async (headerData,tableData) => {
		if(isObjectEmpty(tableData)){throw new ExceptionSystemApiFractuz("Applications Object is Empty");}
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}

		if(isObjectEmpty(headerData)){headerData={};}

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		tableData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodPut(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDbTable,tableData);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse;
	}

	const httpDelete = async (id) => {
		if(isStringEmptyOrSpaces(id)){throw new ExceptionSystemApiFractuz("Application Delete not possible. No ID");}
		let headerData={};

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		headerData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodDelete(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.appDbTable+"/"+id);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}

		return jsonResponse;
	}
	return { httpGet, httpInsert, httpUpdate,httpDelete}
}