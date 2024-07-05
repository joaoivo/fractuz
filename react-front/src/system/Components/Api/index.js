
import { isObjectEmpty } from "../../Libs/Objects";
import { isStringJson } from "../../Libs/Strings";
import { ExceptionSystemDefault } from "../Exceptions";
import { useContextAuth } from "../../Contexts/Auth";

export class ExceptionSystemApiDefault extends ExceptionSystemDefault {
	constructor(mensagem) {
		super(mensagem);
		this.name = this.constructor.name;
		if(arguments.length>1){
			this.data = Array.prototype.slice.call(arguments,1)[0];
		}
		
	}
}

export const useApiDefault = () => {
	const { isUserAuthenticated, getUserLogged} = useContextAuth();

	const methodExecute = async (method,headerData,url,bodyData) => {

		if(bodyData===undefined){bodyData=null;}
		const myHeaders = new Headers();
		Object.keys(headerData).forEach((key)=>{
			if (key.toLowerCase() === "authorization") {
				myHeaders.append(key, headerData[key]);
			} else {
				myHeaders.append(key, encodeURIComponent(headerData[key]));
			}
		});

		const requestOptions = {
			method: method,
			headers: myHeaders,
			redirect: "follow",
		};

		if (bodyData) {
			if(typeof bodyData === 'object'){
				requestOptions.body = JSON.stringify(bodyData);
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("charset", "utf-8");
			}else{requestOptions.body = bodyData.toString();}
		}

		let response;
		try{
			response = await fetch(url, requestOptions);
		}catch(ex){
			// foi colocado este try/catch para conter o output do fetch quando não dá autorizado
			if((isObjectEmpty(response)) || !( ("ok" in response) && ("status" in response) && ("statusText" in response))){
				throw new ExceptionSystemApiDefault(`Strange Server Response NOK. ${ex.message}`);
			}
		}

		const result 	= await response.text();
		const data = {	 result:isStringJson(result)?  JSON.parse(result):result
			,response:{
				 bodyUsed: response.bodyUsed
				,ok: response.ok
				,redirected: response.redirected
				,status: response.status
				,statusText: response.statusText
				,type: response.type
				,url: response.url
			}
			,headerData:headerData
			,url:url
			,requestOptions:requestOptions
			,bodyData:bodyData
			,method: method
			,redirect: "follow"
		};
		if(isUserAuthenticated()){data["user"]= getUserLogged();}
		if(!response.ok){	throw new ExceptionSystemApiDefault(`Server Response NOK. Status ${response.status}; ${response.statusText}`,data);}
		return JSON.parse(result);
	}

	const methodGet	 = async (headerData,url,bodyData) => {return methodExecute ("GET"	,headerData,url,bodyData);}
	const methodPost	 = async (headerData,url,bodyData) => {return methodExecute ("POST"	,headerData,url,bodyData);}
	const methodPut	 = async (headerData,url,bodyData) => {return methodExecute ("PUT"	,headerData,url,bodyData);}
	const methodDelete = async (headerData,url,bodyData) => {return methodExecute ("DELETE",headerData,url,bodyData);}

	return { methodGet, methodPost, methodPut, methodDelete, methodExecute}
}