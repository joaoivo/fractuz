import { ExceptionUserDefault } from "../../system/Components/Exceptions";
import { treatExceptionDefaultsByTypes, treatDefaultError } from "../../system/Libs/Exceptions";
import { useContextConsole } from "../../system/Contexts/Console";
import { useContextPanelMessage } from "../../system/Contexts/Message";

export const TreatmentExceptions=()=>{
	const { addHistoryLog } = useContextConsole();
	const {messageBoxOpen_error} = useContextPanelMessage();


	const treatExceptionUser = (error, processDesc) =>{
	
		if(!(error instanceof ExceptionUserDefault)) {
			treatDefaultError(error,processDesc);
			return;
		}
		const message = `${error}!`;
		messageBoxOpen_error(message,"Erro ao "+processDesc);
		addHistoryLog(message);
	}

	const treatExceptions =(error, processDesc)=>{
		try{
			treatExceptionDefaultsByTypes(error, processDesc, treatExceptionUser);
		}catch(ex){
			messageBoxOpen_error(`Erro no processo interno. O tratamento de erro não pode agir.`,"Erro ao "+processDesc);
			console.error("Process Error Object",error);
			console.error("ErrorTreating Error Object",ex);
			return;
		}
	}

	return {treatExceptions}
}