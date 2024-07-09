import { ExceptionApplicationDefault, ExceptionSystemDefault, ExceptionUserDefault } from "../../Components/Exceptions";
import { isStringEmptyOrSpaces, isStringJson } from "../Strings";
import { systemConfig } from "../../../configs";

import { ExceptionSystemApiUnauthorized } from "../../Components/Api";
import { goToAddress } from "../Urls";
import { routesPublicPages } from "../../../pages/routes";

export const treatDefaultError = (error, processDesc)=>{
	console.error('Exception capturada:', error);
	if((error instanceof ExceptionSystemApiUnauthorized)) {
		alert("Operação não autorizada. Redirecionando para a página de login.");
		goToAddress(routesPublicPages.Login.path);
	}else{
		if(process.env.NODE_ENV === "development"){alert(`Erro ao ${processDesc}. Verifique status no Console do Navegador.\n ${error.message}`);}
	}
	return;
}

export const RegisterException = async (error, processDesc)=>{
	try{
		
		let errorRegisterFieldsValues = {};
		let properties = ["columnNumber","fileName","lineNumber","message","name","stack"];
		properties.forEach((prop)=>{if(prop in error){errorRegisterFieldsValues[prop]=error[prop];}})

		if(!("data" in error)){return;}
		if("message" in error){errorRegisterFieldsValues["AppMessage"]		= error.message;}
		if("stack" in error){errorRegisterFieldsValues["AppStackTrace"]	= error.stack;}

		errorRegisterFieldsValues["AppProcessDesc"]	= processDesc;
		errorRegisterFieldsValues["AppLanguage"]		= "reactjs";
		errorRegisterFieldsValues["ExtraData"]			= JSON.stringify(error);

		const errorExtraData0 = error.data;
		if(!("result" in errorExtraData0) && (errorExtraData0.result)){
			if("errorId" in errorExtraData0.result){
				errorRegisterFieldsValues["PrevErrorID"]= errorExtraData0.result.errorId;
			}
		}

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("charset", "utf-8");

		const requestOptions = {
			 method: "POST"
			,headers: myHeaders
			,redirect: "follow"
			,body : JSON.stringify(errorRegisterFieldsValues)
		};
		let response = await fetch(systemConfig.urls.PUBLIC_API_URL +"/System/Error", requestOptions);
		let resultText = await response.text();
		let result = null;
		if(isStringJson(resultText)){result = JSON.parse(resultText);}

		return result.id;
	}catch(ex){
		console.log("Erro ao Registrar uma exceção no front-end", ex);
		return null;
	}
}

export const treatExceptionDefaultsByTypes =async (error, processDesc
		,callBackExceptionUser
		,callBackExceptionApplication
		,callBackExceptionSystem
		,callBackExceptionGeneral) => {

	let errorID = await RegisterException(error, processDesc);

	if((!!!(error)) || !(error instanceof Error)) {return;}
	if(isStringEmptyOrSpaces(processDesc)){processDesc="[Processo não especificado]";}

	if((callBackExceptionUser			===undefined)||(typeof callBackExceptionUser 			!=="function")){callBackExceptionUser 			= treatDefaultError;}
	if((callBackExceptionApplication	===undefined)||(typeof callBackExceptionApplication 	!=="function")){callBackExceptionApplication = treatDefaultError;}
	if((callBackExceptionSystem		===undefined)||(typeof callBackExceptionSystem 			!=="function")){callBackExceptionSystem 		= treatDefaultError;}
	if((callBackExceptionGeneral		===undefined)||(typeof callBackExceptionGeneral 		!=="function")){callBackExceptionGeneral 		= treatDefaultError;}

	if((error instanceof ExceptionUserDefault)) 					{callBackExceptionUser(error,processDesc);}
	else if((error instanceof ExceptionApplicationDefault)) 	{callBackExceptionApplication(error,processDesc);}
	else if((error instanceof ExceptionSystemDefault)) 		{callBackExceptionSystem(error,processDesc);}
	else 																		{callBackExceptionGeneral(error,processDesc);}

	return errorID;
}