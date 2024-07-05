import { useApiDefault } from "../../../../system/Components/Api";
import { isObjectEmpty } from "../../../../system/Libs/Objects";
import { isStringEmptyOrSpaces } from "../../../../system/Libs/Strings";
import { useContextAuth } from "../../../../system/Contexts/Auth";
import { ExceptionSystemApiFractuz, apiFractuzEndPoint } from "..";
import { systemConfig } from "../../../../configs";

export const useApiSystemError= ()=>{
	const { isUserAuthenticated, getUserLogged} = useContextAuth();
	const { methodGet , methodPost, methodPut, methodDelete} = useApiDefault();


	const httpGet = async (headerData) => {
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}
		headerData["Authorization"] = "Bearer " + getUserLogged().token;

		const jsonResponse = await methodGet(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.SystemError);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse.dataList;
	}

	const httpInsert = async (headerData,APIData) => {
		if(isObjectEmpty(APIData)){throw new ExceptionSystemApiFractuz("Errors Object is Empty");}
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}

		if(isObjectEmpty(headerData)){headerData={};}

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		APIData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodPost(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.SystemError,APIData);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse;
	}

	const httpUpdate = async (headerData,APIData) => {
		if(isObjectEmpty(APIData)){throw new ExceptionSystemApiFractuz("Errors Object is Empty");}
		if(!isUserAuthenticated()){throw new ExceptionSystemApiFractuz("User not Auhenticated");}

		if(isObjectEmpty(headerData)){headerData={};}

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		APIData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodPut(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.SystemError,APIData);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}
		return jsonResponse;
	}

	const httpDelete = async (id) => {
		if(isStringEmptyOrSpaces(id)){throw new ExceptionSystemApiFractuz("Error Delete not possible. No ID");}
		let headerData={};

		const user = getUserLogged();
		headerData["Authorization"] = "Bearer " + user.token;
		headerData["SystemCreationUser"] = user.userID;

		const jsonResponse = await methodDelete(headerData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.SystemError+"/"+id);
		if(!jsonResponse.isSuccess){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro: ${jsonResponse.description}`);}

		return jsonResponse;
	}

	return { httpGet, httpInsert, httpUpdate,httpDelete}
}