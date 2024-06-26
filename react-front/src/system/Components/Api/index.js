
import { isObjectEmpty } from "../../Libs/Objects";
import { ExceptionSystemDefault } from "../Exceptions";

export class ExceptionSystemApiDefault extends ExceptionSystemDefault {
	constructor(mensagem) {
		super(mensagem);
		this.name = this.constructor.name;
		this.data = { mensagem };
	}
}

export const useApiDefault = () => {

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

		if(!response.ok){	throw new ExceptionSystemApiDefault(`Server Response NOK. Status ${response.status}; ${response.statusText}`);}
		const result 	= await response.text();
		return JSON.parse(result);
	}

	const methodGet	 = async (headerData,url,bodyData) => {return methodExecute ("GET"	,headerData,url,bodyData);}
	const methodPost	 = async (headerData,url,bodyData) => {return methodExecute ("POST"	,headerData,url,bodyData);}
	const methodPut	 = async (headerData,url,bodyData) => {return methodExecute ("PUT"	,headerData,url,bodyData);}
	const methodDelete = async (headerData,url,bodyData) => {return methodExecute ("DELETE",headerData,url,bodyData);}

	return { methodGet, methodPost, methodPut, methodDelete, methodExecute}
}