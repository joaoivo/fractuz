import { useState } from "react";
import { useContextAuth } from '../../../system/Contexts/Auth';
import { useContextConsole } from "../../../system/Contexts/Console";

import {useApiFractuz} from "../../../components/api/fractus";

export default function Login(){

	const [email,setEmail]=useState('');
	const [password,setPassword]=useState('');
	const { getLoginToken } = useApiFractuz();

	const {isAuthenticated,userLoged, login, logout} = useContextAuth();
	const {addHistoryLog} = useContextConsole();

	const handleLogin = async ()=>{
		try {
			//if(isAuthenticated || userLoged){logout();}

			const response = await getLoginToken("jims_ibr@yahoo.com.br", "a1b2c3d4");
			console.log("response login",response);
			if(response.code!==0){
				alert("Login não autorizado. Verifique o status no Log.")
				addHistoryLog(`Login não autorizado. : {code:${response.code}, title:${response.tittle}}`);
				return;
			}

			let messages = login(response.dataList[0]);
			if(!!!messages){ 
				alert("Dados de resposta de login não válidos. Verifique status no LOG!")
				addHistoryLog("Dados de resposta de login não válidos:["+messages.join("<br/>")+"]");
				return;
			}


		 } catch (error) {
			// Lidar com o erro aqui, se necessário
			alert("Erro ao tentar logar. Verifique status no Log.");
			console.log("Erro ao tentar logar. Verifique status no Log.",error);
			
			addHistoryLog("Erro ao obter o token de login:"+ error);
		 }
	}

	return(
		<div>
			<div><label>E-mail:	<input type="email" 		value={email} 		onChange={(e)=>setEmail(e.target.value)}/></label></div>
			<div><label>Password:<input type="password" 	value={password} 	onChange={(e)=>setPassword(e.target.value)}/></label></div>
			<div>
				<button onClick={handleLogin}>Entrar</button>
			</div>
		</div>
	);
}
