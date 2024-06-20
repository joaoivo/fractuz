import { useApiDefault } from "../../../../system/Components/Api";
import { ExceptionSystemApiFractuz, apiFractuzEndPoint } from "..";
import { systemConfig } from "../../../../configs";

export const useApiFractuzUsers= ()=>{
	const { methodGet } = useApiDefault();
	const getLoginToken = async (loginData) => {
		const jsonResponse = await methodGet(loginData,systemConfig.urls.PUBLIC_API_URL + apiFractuzEndPoint.login);
		if(jsonResponse.code !==0){throw new ExceptionSystemApiFractuz(`O servidor Acusou erro ${jsonResponse.code}: Message: ${jsonResponse.description}`);}
		return jsonResponse;
	};
	return {getLoginToken};
}