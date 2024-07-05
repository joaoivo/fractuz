import { ExceptionApplicationDefault, ExceptionSystemDefault, ExceptionUserDefault } from "../../Components/Exceptions";
import { isStringEmptyOrSpaces } from "../Strings";
import { systemConfig } from "../../../configs";

export const treatDefaultError = (error, processDesc)=>{
	if(process.env.NODE_ENV === "development"){alert(`Erro ao ${processDesc}. Verifique status no Console do Navegador.\n ${error.message}`);}
	
	console.error('Exception capturada:', error.message);
	console.error('Dados adicionais:', error);
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
		if(!("result" in errorExtraData0) || !("errorId" in errorExtraData0.result)){return;}
		errorRegisterFieldsValues["PrevErrorID"]= errorExtraData0.result.errorId;

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

		console.log("errorRegisterFieldsValues",errorRegisterFieldsValues);
	}catch(ex){
		console.log("Erro ao Registrar uma exceção no front-end", ex);
	}
}

export const treatExceptionDefaultsByTypes =(error, processDesc
		,callBackExceptionUser
		,callBackExceptionApplication
		,callBackExceptionSystem
		,callBackExceptionGeneral) => {

	RegisterException(error, processDesc);

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

}