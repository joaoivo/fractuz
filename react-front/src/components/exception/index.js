import { ExceptionUserDefault } from "../../system/Components/Exceptions";
import { treatExceptionDefaultsByTypes, treatDefaultError } from "../../system/Libs/Exceptions";
import { useContextConsole } from "../../system/Contexts/Console";



export const TreatmentExceptions=()=>{
	const { addHistoryLog } = useContextConsole();

	const treatExceptionUser = (error, processDesc) =>{
	
		if(!(error instanceof ExceptionUserDefault)) {
			treatDefaultError(error,processDesc);
			return;
		}
		const message = `${error}!`;
		alert(message);
		addHistoryLog(message);
	}

	const treatExceptions =(error, processDesc)=>{
		try{
			treatExceptionDefaultsByTypes(error, processDesc, treatExceptionUser);
		}catch(ex){
			alert(`Erro no processo interno. O tratamento de erro não pode agir. `);
			console.error("Process Error Object",error);
			console.error("ErrorTreating Error Object",ex);
			return;
		}
	}

	return {treatExceptions}
}