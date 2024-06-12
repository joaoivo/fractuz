
import { ExceptionSystemDefault } from "../Exceptions";

export class ExceptionSystemApiDefault extends ExceptionSystemDefault {
	constructor(mensagem) {
		super(mensagem);
		this.name = this.constructor.name;
		this.data = { mensagem };
	}
}

export const useApiDefault = () => {

	const methodGet = async (headerData,url) => {

		const myHeaders = new Headers();
		Object.keys(headerData).forEach((key)=>{myHeaders.append(key, headerData[key]);});

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		let response;
		try{
			response = await fetch(url, requestOptions);
		}catch(ex){
			// foi colocado este try/catch para conter o output do fetch quando não dá autorizado
			if(!( ("ok" in response) && ("status" in response) && ("statusText" in response))){
				throw new ExceptionSystemApiDefault(`Strange Server Response NOK. ${ex.message}`);
			}
		}

		if(!response.ok){	throw new ExceptionSystemApiDefault(`Server Response NOK. Status ${response.status}; ${response.statusText}`);}
		const result 	= await response.text();
		return JSON.parse(result);
	}

	return { methodGet}
}