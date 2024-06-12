import { ExceptionApplicationDefault, ExceptionSystemDefault, ExceptionUserDefault } from "../../Components/Exceptions";
import { isObjectEmpty } from "../Objects";
import { isStringEmptyOrSpaces } from "../Strings";

export const treatDefaultError = (error, processDesc)=>{
	if(process.env.NODE_ENV === "development"){alert(`Erro ao ${processDesc}. Verifique status no Console do Navegador.\n ${error.message}`);}
	
	console.error('Exception capturada:', error.message);
	console.error('Dados adicionais:', error);
	return;
}

export const treatExceptionDefaultsByTypes =(error, processDesc
		,callBackExceptionUser
		,callBackExceptionApplication
		,callBackExceptionSystem
		,callBackExceptionGeneral) => {
	
	if((isObjectEmpty(error)) || !(error instanceof Error)) {return;}
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