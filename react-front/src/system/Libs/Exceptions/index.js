import { ExceptionApplicationDefault, ExceptionSystemDefault, ExceptionUserDefault } from "../../Components/Exceptions";
import { isStringEmptyOrSpaces } from "../Strings";

export const treatDefaultError = (error, processDesc)=>{
	if(process.env.NODE_ENV === "development"){alert(`Erro ao ${processDesc}. Verifique status no Console do Navegador.\n ${error.message}`);}
	
	console.error('Exception capturada:', error.message);
	console.error('Dados adicionais:', error);
	return;
}

export const getJsonErrorData = (datas)=>{
	let result = {}

	if(typeof datas === "object"){
		Object.entries(datas).map(([key, data]) => (
			result[key] = getJsonErrorData(data)
		))
	}else if(Array.isArray(datas)){
		
	}else{
		if(!("strings" in result)){result["strings"]=[];}
		if(Array.isArray(result["strings"])){result["strings"]=[...result["strings"],datas.toString()];}
	}

	return result;
}

export const registerException = (error, processDesc)=>{
	let errorData = {};
	let properties = ["columnNumber","fileName","lineNumber","message","name","stack"];

	properties.forEach((prop)=>{
		if(prop in error){errorData[prop]=error[prop];}
	})

	if("data" in error){
		errorData["data"]= (error.data);//getJsonErrorData
	}
	console.log("error",error);
	console.log("errorData",errorData);
}

export const treatExceptionDefaultsByTypes =(error, processDesc
		,callBackExceptionUser
		,callBackExceptionApplication
		,callBackExceptionSystem
		,callBackExceptionGeneral) => {

	try{
		registerException(error, processDesc);
	}catch(ex){}

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